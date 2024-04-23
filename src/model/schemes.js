class Scheme {
    constructor(db) {
        this.db = db
    }
}

class Product extends Scheme {
    async all(pageSize, offset, filterCode, filterName) {
        filterCode = filterCode ? filterCode : ""
        filterName = filterName ? filterName : ""
        const query = `
            SELECT
                json_object
                (
                    'codigos',
                    (
                        SELECT 
                            JSON_GROUP_ARRAY
                            (
                                JSON_OBJECT
                                (
                                    C.nombre,
                                    CASE
                                        WHEN LENGTH('${filterCode}') > 0 AND INSTR(UPPER(PC.codigo), UPPER('${filterCode}')) > 0 THEN
                                            SUBSTR(COALESCE(PC.codigo, ''), 0, INSTR(UPPER(PC.codigo), UPPER('${filterCode}'))) || 
                                            '<mark>' || SUBSTR(COALESCE(PC.codigo, ''), INSTR(UPPER(PC.codigo), UPPER('${filterCode}')), LENGTH('${filterCode}')) || 
                                            '</mark>' || SUBSTR(COALESCE(PC.codigo, ''), INSTR(UPPER(PC.codigo), UPPER('${filterCode}')) + LENGTH('${filterCode}'))
                                        ELSE
                                            COALESCE(PC.codigo, '')
                                            
                                    END  
                                )            
                            )
                        FROM
                            Producto_Codigo PC
                        RIGHT JOIN 
                            Codigo C
                        ON
                            C.id_codigo = PC.id_codigo
                        AND
                            PC.id_producto = P.id_producto 
                        ORDER BY
                            C.nombre
                    ),
                    'Nombre',
                    CASE
                        WHEN LENGTH('${filterName}') > 0 AND INSTR(UPPER(P.nombre), UPPER('${filterName}')) > 0 THEN
                            SUBSTR(COALESCE(P.nombre, ''), 0, INSTR(UPPER(P.nombre), UPPER('${filterName}'))) || 
                            '<mark>' || SUBSTR(COALESCE(P.nombre, ''), INSTR(UPPER(P.nombre), UPPER('${filterName}')), LENGTH('${filterName}')) || 
                            '</mark>' || SUBSTR(COALESCE(P.nombre, ''), INSTR(UPPER(P.nombre), UPPER('${filterName}')) + LENGTH('${filterName}'))
                        ELSE
                            P.nombre
                    END,
                    'unidades',
                    (
                        SELECT 
                            JSON_GROUP_ARRAY(JSON_OBJECT('Unidad', U.nombre, 'Cantidad', PU.cantidad, 'Precio de venta', PU.precio_venta, 'Descuento', PU.descuento, 'Ganancia', PU.ganancia, 'Precio de compra', PU.precio_compra))
                        FROM
                            Producto_Unidad PU
                        INNER JOIN 
                            Unidad U
                        ON
                            U.id_unidad = PU.id_unidad
                        WHERE
                            PU.id_producto = P.id_producto
                        ORDER BY
                            U.id_unidad
                    )
                ) producto
            FROM 
                Producto P
            INNER JOIN
                Producto_Codigo PC
            ON
                PC.id_producto = P.id_producto
            AND
                PC.id_producto 
            IN 
            (
                SELECT
                    PC.id_producto
                FROM
                    Producto_Codigo PC
                WHERE
                    PC.codigo LIKE '%${filterCode}%'
            )
            WHERE
                P.nombre LIKE '%${filterName}%' 
            LIMIT ${pageSize}
            OFFSET ${offset}
        `
        return await this.db.fetch(query, [], (data) => {
            const jsonRows = data.map((row) => JSON.parse(row["producto"]))
            const rows = jsonRows.reduce((rows, product) => {
                const productObj = product.codigos.reduce((codigos, codigo) => {
                    const key = Object.keys(codigo)[0]
                    codigos[key] = codigo[key]
                    return codigos
                }, {}) // Buscamos los codigos
                productObj["Nombre"] = product.Nombre
                productObj["unidades"] = product.unidades // Obtenemos las unidades
                rows.push(productObj) // Agregamos el producto
                return rows
            }, [])
            return rows
        })
    }
    async total(filterCode, filterName) {
        const sql = `
        SELECT
            COUNT(DISTINCT PC.id_producto) total
        FROM
            Producto P
        INNER JOIN
            Producto_Codigo PC
        ON
            PC.id_producto = P.id_producto
        AND
            PC.codigo LIKE '%${filterCode ? filterCode : ""}%'
        WHERE
            P.nombre LIKE '%${filterName ? filterName : ""}%' 
        `
        return await this.db.fetch(sql, [], (rows) => rows[0]["total"])
    }

    async codes() {
        const sql = "SELECT nombre FROM codigo ORDER BY nombre"
        return await this.db.fetch(sql, [], (rows) => rows)
    }

    async get(id) {}

    async delete(id) {}

    async update(id, ...args) {}

    async create(product) {}
}

class User extends Scheme {
    async get(user, pass) {
        const sql = `
            SELECT
                JSON_OBJECT
                (
                    'usuario',
                    U.usuario,
                    'nombre',
                    U.nombre,
                    'rol',
                    R.nombre
                ) usuario
            FROM 
                Usuario U
            INNER JOIN 
                Rol R
            ON 
                R.id_rol = U.id_rol
            WHERE
                U.usuario = ?
            AND
                U.contrasenia = ?
        `
        return await this.db.fetch(
            sql,
            [user, pass],
            (rows) =>
                rows.length > 0 ? JSON.stringify(rows[0]["usuario"]) : null,
            () => null
        )
    }
}

module.exports = { Product, User }
