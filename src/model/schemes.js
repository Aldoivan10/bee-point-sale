class Scheme {
    constructor(db) {
        this.db = db
    }

    encloseStr(str, find, init, end) {
        if (!str || !find) return str
        const regex = new RegExp(find, "i")
        const index = str.search(regex)
        if (index === -1) return str
        const length = find.length
        return `${str.slice(0, index)}${init}${str.slice(
            index,
            index + length
        )}${end}${str.slice(index + length)}`
    }
}

class Product extends Scheme {
    async all(pageSize, offset, filter) {
        filter = filter ? filter : ""
        const query = `
            SELECT
                json_object
                (
                    'id',
                    P.id_producto,
                    'codigos',
                    (
                        SELECT 
                            JSON_GROUP_ARRAY
                            (
                                JSON_OBJECT
                                (
                                    C.nombre,
                                    COALESCE(PC.codigo, '')
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
                    P.nombre,
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
            WHERE
                P.nombre LIKE '%${filter}%' 
            OR
                PC.codigo LIKE '%${filter}%'
            GROUP BY
                P.id_producto
            ORDER BY
                P.id_producto
            LIMIT ${pageSize}
            OFFSET ${offset}
        `
        return await this.db.fetch(query, [], (data) => {
            const jsonRows = data.map((row) => JSON.parse(row["producto"]))
            const rows = jsonRows.reduce((rows, product) => {
                const productObj = product.codigos.reduce((codigos, codigo) => {
                    const key = Object.keys(codigo)[0]
                    codigos[key] = this.encloseStr(
                        codigo[key],
                        filter,
                        "<mark>",
                        "</mark>"
                    )
                    return codigos
                }, {}) // Buscamos los codigos
                productObj["id"] = product.id
                productObj["Nombre"] = this.encloseStr(
                    product.Nombre,
                    filter,
                    "<mark>",
                    "</mark>"
                )
                productObj["unidades"] = product.unidades // Obtenemos las unidades
                rows.push(productObj) // Agregamos el producto
                return rows
            }, [])
            return rows
        })
    }
    async total(filter) {
        const sql = `
        SELECT
            COUNT(DISTINCT PC.id_producto) total
        FROM
            Producto P
        INNER JOIN
            Producto_Codigo PC
        ON
            PC.id_producto = P.id_producto
        WHERE
            P.nombre LIKE '%${filter ? filter : ""}%' 
        OR
            PC.codigo LIKE '%${filter ? filter : ""}%'
        `
        return await this.db.fetch(sql, [], (rows) => rows[0]["total"])
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

class Code extends Scheme {
    async all() {
        const sql = "SELECT * FROM codigo ORDER BY nombre"
        return await this.db.fetch(sql, [], (rows) => rows)
    }

    async create(code) {}

    async delete(id) {}

    async update(id, code) {}
}

class Unit extends Scheme {
    async all() {
        const sql = "SELECT id_unidad value, nombre text FROM Unidad"
        return await this.db.fetch(sql, [], (rows) => rows)
    }

    async create(units) {}

    async delete(id) {}

    async update(id, unit) {}
}

module.exports = { Product, User, Code, Unit }
