class Scheme {
    constructor(db) {
        this.db = db
        this.listener = () => {}
    }

    error(msg, data = null) {
        return this.msg("error", msg, data)
    }

    ok(msg, data = null) {
        this.listener()
        return this.msg("success", msg, data)
    }

    msg(status, msg, data = null) {
        return { status: status, msg: msg, data: data }
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

    onUpdated(action) {
        this.listener = action
    }
}

class Product extends Scheme {
    async all(pageSize, offset, filter) {
        filter = filter ? filter : ""
        const query = `
            SELECT
                json_object
                (
                    'id_producto',
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
                    ),
                    'Nombre',
                    P.nombre,
                    'unidades',
                    (
                        SELECT 
                            JSON_GROUP_ARRAY(JSON_OBJECT('id_unidad', U.id_unidad, 'Unidad', U.nombre, 'Cantidad', PU.cantidad, 'Precio de venta', PU.precio_venta, 'Descuento', PU.descuento, 'Ganancia', PU.ganancia, 'Precio de compra', PU.precio_compra))
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
                P.nombre
            LIMIT ?
            OFFSET ?
        `
        return await this.db.fetch(query, [pageSize, offset], (data) => {
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
                productObj["ID"] = product.id_producto
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

    async get(id) {
        const find = `
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
                            JSON_GROUP_ARRAY(JSON_OBJECT('id_unidad', U.id_unidad, 'Unidad', U.nombre, 'Cantidad', PU.cantidad, 'Precio de venta', PU.precio_venta, 'Descuento', PU.descuento, 'Ganancia', PU.ganancia, 'Precio de compra', PU.precio_compra))
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
                P.id_producto = ?
            GROUP BY
                P.id_producto
        `
        return await this.db.fetch(find, [id], (rows) => {
            const product = JSON.parse(rows[0]["producto"])
            const productObj = product.codigos.reduce((codigos, codigo) => {
                const key = Object.keys(codigo)[0]
                codigos[key] = codigo[key]
                return codigos
            }, {}) // Buscamos los codigo
            productObj["Nombre"] = product.Nombre
            productObj["unidades"] = product.unidades // Obtenemos las unidades
            return productObj
        })
    }

    async delete(arr_ids) {
        try {
            const sql = "DELETE FROM Producto WHERE id_producto = ?"
            for (const ids of arr_ids) {
                await this.db.query(sql, ids)
            }
            return this.ok("Registros eliminados")
        } catch (err) {
            return this.error("No se pudo eliminar el producto", err)
        }
    }
    async create(product) {
        try {
            const insertProduct = `
            INSERT INTO
                Producto
            VALUES
            (
                (
                    WITH cte AS
                    (
                        SELECT id_producto FROM producto
                        UNION ALL 
                        SELECT 0
                    )
                    SELECT MIN(id_producto) + 1
                    FROM cte
                    WHERE NOT EXISTS
                    (
                        SELECT * 
                        FROM producto 
                        WHERE producto.id_producto = cte.id_producto + 1
                    )
                ),
                ?
            ) RETURNING id_producto`
            let res = await this.db.insert(
                insertProduct,
                [product["name"]],
                (res) => res
            )

            const id = res.lastID
            const codes = product["codes"]
            const insertCodes = `
            INSERT INTO
                Producto_Codigo
            VALUES
            (?, ?, ?)
        `
            for (const key of Object.keys(codes)) {
                await this.db.insert(insertCodes, [key, id, codes[key]])
            }
            const insertUnits = `
            INSERT INTO 
                Producto_Unidad
            VALUES
            (?,?,?,?,?,?,?)
        `
            const units = product["units"]
            for (const unit of units) {
                await this.db.insert(insertUnits, [
                    id,
                    unit["unidad"],
                    unit["cantidad"],
                    +unit["descuento"] / 100,
                    +unit["ganancia"] / 100,
                    unit["compra"],
                    unit["venta"],
                ])
            }

            return this.ok("El producto ha sido creado")
        } catch (err) {
            return this.error(
                "No se ha podido crear el producto. Intentelo más tarde",
                err
            )
        }
    }
}
class User extends Scheme {
    async all() {
        const sql = `
            SELECT
                U.nombre Nombre,
                U.usuario Usuario,
                U.contrasenia AS 'Contraseña',
                R.nombre Rol
            FROM
                Usuario U
            INNER JOIN
                Rol R
            ON 
                R.id_rol = U.id_rol
        `
        return await this.db.fetch(sql, [], (rows) => rows)
    }

    async create(user) {}

    async update(user) {}

    async delete(arr_ids) {
        try {
            const sql = "DELETE FROM Usuario WHERE id_usuario = ?"
            for (const ids of arr_ids) {
                await this.db.query(sql, ids)
            }
            return this.ok("Registros eliminados")
        } catch (err) {
            return this.error("No se pudo eliminar los usuarios", err)
        }
    }

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
        const sql = "SELECT id_codigo ID, nombre Nombre FROM codigo ORDER BY ID"
        return await this.db.fetch(sql, [], (rows) => rows)
    }

    async create(code) {
        const insert = `
            INSERT INTO
                Codigo
            VALUES
            (
                (
                    WITH cte AS
                    (
                        SELECT id_codigo FROM Codigo
                        UNION ALL 
                        SELECT 0
                    )
                    SELECT MIN(id_codigo) + 1
                    FROM cte
                    WHERE NOT EXISTS
                    (
                        SELECT * 
                        FROM Codigo 
                        WHERE Codigo.id_codigo = cte.id_codigo + 1
                    )
                ),
                ?
            ) `
        await this.db.insert(insert, [code], (res) => res)
        return this.ok("Código agregado")
    }

    async delete(arr_ids) {
        try {
            const sql = "DELETE FROM Codigo WHERE id_codigo = ?"
            for (const ids of arr_ids) {
                await this.db.query(sql, ids)
            }
            return this.ok("Registros eliminados")
        } catch (err) {
            return this.error("No se pudo eliminar los códigos", err)
        }
    }

    async update(code) {
        const update = `
            UPDATE
                Codigo
            SET 
                nombre = ?
            WHERE 
                id_codigo = ?
            `
        await this.db.query(update, [code.name, code.id], (res) => res)
        return this.ok("Código editado")
    }
}

class Departament extends Scheme {
    async all() {
        const sql = "SELECT id_departamento ID, nombre Nombre FROM Departamento"
        return await this.db.fetch(sql, [], (rows) => rows)
    }

    async create(departament) {
        const update = `
            INSERT INTO
                Departamento
            VALUES
            (
                (
                    WITH cte AS
                    (
                        SELECT id_departamento FROM Departamento
                        UNION ALL 
                        SELECT 0
                    )
                    SELECT MIN(id_departamento) + 1
                    FROM cte
                    WHERE NOT EXISTS
                    (
                        SELECT * 
                        FROM Departamento 
                        WHERE Departamento.id_departamento = cte.id_departamento + 1
                    )
                ),
                ?
            ) `
        await this.db.insert(update, [departament], (res) => res)
        return this.ok("Departamento agregado")
    }

    async delete(arr_ids) {
        try {
            const sql = "DELETE FROM Departamento WHERE id_deparatamento = ?"
            for (const ids of arr_ids) {
                await this.db.query(sql, ids)
            }
            return this.ok("Registros eliminados")
        } catch (err) {
            return this.error("No se pudo eliminar los departamentos", err)
        }
    }

    async update(departament) {
        const update = `
            UPDATE
                Departamento
            SET 
                nombre = ?
            WHERE 
                id_departamento = ?
            `
        await this.db.query(
            update,
            [departament.name, departament.id],
            (res) => res
        )
        return this.ok("Departamento editado")
    }
}

class Unit extends Scheme {
    async all() {
        const sql = `SELECT id_unidad ID, nombre Nombre FROM Unidad`
        return await this.db.fetch(sql, [], (rows) => rows)
    }

    async create(unit) {
        const insert = `
            INSERT INTO
                Unidad
            VALUES
            (
                (
                    WITH cte AS
                    (
                        SELECT id_unidad FROM Unidad
                        UNION ALL 
                        SELECT 0
                    )
                    SELECT MIN(id_unidad) + 1
                    FROM cte
                    WHERE NOT EXISTS
                    (
                        SELECT * 
                        FROM Unidad 
                        WHERE Unidad.id_unidad = cte.id_unidad + 1
                    )
                ),
                ?
            ) `
        await this.db.insert(insert, [unit], (res) => res)
        return this.ok("Unidad agregada")
    }

    async delete(arr_ids) {
        try {
            const sql = "DELETE FROM Unidad WHERE id_unidad = ?"
            for (const ids of arr_ids) {
                await this.db.query(sql, ids)
            }
            return this.ok("Registros eliminados")
        } catch (err) {
            return this.error("No se pudo eliminar las unidades", err)
        }
    }

    async update(unit) {
        const update = `
            UPDATE
                Unidad
            SET 
                nombre = ?
            WHERE 
                id_unidad = ?
            `
        await this.db.query(update, [unit.name, unit.id], (res) => res)
        return this.ok("Unidad editada")
    }
}

class Rol extends Scheme {
    async all() {
        const sql = `SELECT id_rol ID, nombre Nombre FROM Rol`
        return await this.db.fetch(sql, [], (rows) => rows)
    }

    async create(rol) {
        const insert = `
            INSERT INTO
                Rol
            VALUES
            (
                (
                    WITH cte AS
                    (
                        SELECT id_rol FROM Rol
                        UNION ALL 
                        SELECT 0
                    )
                    SELECT MIN(id_rol) + 1
                    FROM cte
                    WHERE NOT EXISTS
                    (
                        SELECT * 
                        FROM Rol 
                        WHERE Rol.id_rol = cte.id_rol + 1
                    )
                ),
                ?
            ) `
        await this.db.insert(insert, [rol], (res) => res)
        return this.ok("Rol agregado")
    }

    async delete(arr_ids) {
        try {
            const sql = "DELETE FROM Rol WHERE id_rol = ?"
            for (const ids of arr_ids) {
                await this.db.query(sql, ids)
            }
            return this.ok("Registros eliminados")
        } catch (err) {
            return this.error("No se pudo eliminar los roles", err)
        }
    }

    async update(unit) {
        const update = `
            UPDATE
                Rol
            SET 
                nombre = ?
            WHERE 
                id_rol = ?
            `
        await this.db.query(update, [unit.name, unit.id], (res) => res)
        return this.ok("Rol editado")
    }
}

class Client extends Scheme {
    async all(pageSize, offset, filter) {
        filter = filter ? filter : ""
        const query = `
            SELECT 
                E.id_entidad ID, 
                COALESCE(E.RFC, 'S/D') RFC, 
                E.nombre AS Nombre,
                COALESCE(E.direccion, 'S/D') AS Dirección,
                COALESCE(E.domicilio, 'S/D') AS Domicilio,
                E.codigo_postal AS 'Código Postal',
                COALESCE(E.telefono, 'S/N') AS Télefono,
                TE.nombre AS Tipo,
                COALESCE(E.correo, 'S/D') AS Correo
            FROM 
                Entidad E
            INNER JOIN
                Tipo_Entidad TE
            ON
                TE.id_tipo_entidad = E.id_tipo_entidad
            WHERE
                E.nombre LIKE '%${filter}%' 
            ORDER BY
                TE.id_tipo_entidad,
                E.nombre
            LIMIT ?
            OFFSET ?
        `
        return await this.db.fetch(query, [pageSize, offset], (rows) => {
            const markedRows = rows.map((row) => {
                row.Nombre = this.encloseStr(
                    row.Nombre,
                    filter,
                    "<mark>",
                    "</mark>"
                )
                return row
            })
            return markedRows
        })
    }

    async total(filter) {
        const sql = `
        SELECT
            COUNT(id_entidad) total
        FROM
            Entidad
        WHERE
            nombre LIKE '%${filter ? filter : ""}%' 
        `
        return await this.db.fetch(sql, [], (rows) => rows[0]["total"])
    }

    async get(id) {}

    async delete(arr_ids) {
        try {
            const sql = "DELETE FROM Cliente WHERE id_cliente = ?"
            for (const ids of arr_ids) {
                await this.db.query(sql, ids)
            }
            return this.ok("Registros eliminados")
        } catch (err) {
            return this.error("No se pudo eliminar los clientes", err)
        }
    }

    async update(id, ...args) {}

    async create(product) {
        try {
            const insertProduct = `
            INSERT INTO
                Producto
            VALUES
            (
                (
                    WITH cte AS
                    (
                        SELECT id_producto FROM producto
                        UNION ALL 
                        SELECT 0
                    )
                    SELECT MIN(id_producto) + 1
                    FROM cte
                    WHERE NOT EXISTS
                    (
                        SELECT * 
                        FROM producto 
                        WHERE producto.id_producto = cte.id_producto + 1
                    )
                ),
                ?
            ) RETURNING id_producto`
            let res = await this.db.insert(
                insertProduct,
                [product["name"]],
                (res) => res
            )
            const id = res.lastID
            const codes = product["codes"]
            const insertCodes = `
            INSERT INTO
                Producto_Codigo
            VALUES
            (?, ?, ?)
        `
            for (const key of Object.keys(codes)) {
                await this.db.insert(insertCodes, [key, id, codes[key]])
            }
            const insertUnits = `
            INSERT INTO 
                Producto_Unidad
            VALUES
            (?,?,?,?,?,?,?)
        `
            const units = product["units"]
            for (const unit of units) {
                await this.db.insert(insertUnits, [
                    id,
                    unit["unidad"],
                    unit["cantidad"],
                    +unit["descuento"] / 100,
                    +unit["ganancia"] / 100,
                    unit["compra"],
                    unit["venta"],
                ])
            }

            return this.ok("El producto ha sido creado")
        } catch (err) {
            return this.error(
                "No se ha podido crear el producto. Intentelo más tarde",
                err
            )
        }
    }
}

class KeyBoard extends Scheme {
    async keys() {
        const query = `
            SELECT
                combinacion,
                funcion
            FROM
                Teclado
        `
        return await this.db.fetch(query, [], (rows) =>
            rows.reduce((obj, row) => {
                return { ...obj, [row["combinacion"]]: row["funcion"] }
            }, {})
        )
    }
}

class Ticket extends Scheme {
    async all() {
        const query = `
            SELECT 
                seccion,
                valor
            FROM 
                Ticket
        `
        return await this.db.fetch(query, [], (rows) => {
            const mappedRows = rows.reduce((obj, row) => {
                return { ...obj, [row.seccion]: row["valor"] }
            }, {})
            return mappedRows
        })
    }

    async update(ticket) {
        const update = `
            UPDATE 
                Ticket 
            SET
                valor = ?
            WHERE 
                seccion = ?
        `
        for (const section of Object.keys(ticket)) {
            await this.db.query(
                update,
                [ticket[section], section],
                (res) => res
            )
        }

        return this.ok("Ticket actualizado")
    }
}

class Log extends Scheme {}

module.exports = {
    Product,
    User,
    Code,
    Unit,
    Client,
    KeyBoard,
    Departament,
    Rol,
    Ticket,
    Log,
}
