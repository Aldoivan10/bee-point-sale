class Scheme {
    constructor(db) {
        this.db = db
    }
}

class Product extends Scheme {
    async all(pageSize, offset, filterCode, filterName) {
        filterCode = filterCode ? `'${filterCode}'` : "null"
        const query = `
            SELECT
                json_object
                (
                    'codigos',
                    (
                        SELECT 
                            JSON_GROUP_ARRAY
                            (
                                CASE
                                    WHEN ${filterCode} IS NOT NULL AND INSTR(UPPER(PC.codigo), UPPER(${filterCode})) > 0 THEN
                                        SUBSTR(COALESCE(PC.codigo, ''), 0, INSTR(UPPER(PC.codigo), UPPER(${filterCode}))) || '<mark>' || SUBSTR(COALESCE(PC.codigo, ''), INSTR(UPPER(PC.codigo), UPPER(${filterCode})), LENGTH(${filterCode})) || '</mark>' || SUBSTR(COALESCE(PC.codigo, ''), INSTR(UPPER(PC.codigo), UPPER(${filterCode})) + LENGTH(${filterCode}))
                                    ELSE
                                        COALESCE(PC.codigo, '')
                                        
                                END              
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
                    'nombre',
                    P.nombre,
                    'unidades',
                    (
                        SELECT 
                            JSON_GROUP_ARRAY(JSON_OBJECT('unidad', U.nombre, 'cantidad', PU.cantidad, 'descuento', PU.descuento, 'ganancia', PU.ganancia, 'precio_compra', PU.precio_compra, 'precio_venta', PU.precio_venta))
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
                    PC.codigo LIKE '%'||COALESCE(${filterCode}, '')||'%'
            )
            LIMIT ${pageSize}
            OFFSET ${offset}
        `
        return await this.db.fetch(query, [], (data) => {
            const jsonRows = data.map((row) => JSON.parse(row["producto"]))
            const rows = jsonRows.reduce((rows, product) => {
                const row = product.codigos
                const units = product.unidades.reduce((acc, val) => {
                    acc.push([val.cantidad, val.unidad, val.precio_venta])
                    return acc
                }, [])
                row.push(product.nombre)
                row.push(units[0])
                rows.push(row.flat())
                for (const unit of units.slice(1)) {
                    const otherRow = Array.form("".repeat(row.length))
                    otherRow.push(unit)
                    rows.push(otherRow.flat())
                }
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
            Producto_Codigo PC
        WHERE
            PC.codigo LIKE '%${filterCode ? filterCode : ""}%'
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

module.exports = { Product }
