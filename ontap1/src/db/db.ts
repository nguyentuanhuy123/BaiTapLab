import * as SQLite from "expo-sqlite"
let _db: SQLite.SQLiteDatabase |null=null;
export async function getDb() {
    if(!_db){
        _db=await SQLite.openDatabaseAsync("shop5.db");
        await _db.execAsync("PRAGMA foreign_keys = ON")
    }
    return _db
}
export async function ensureSchema() {
    const db=await getDb();
    await db.execAsync(`
        create table if not exists products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price real not null check(price>=0),
            unit TEXT,
            create_at text not null default (datetime('now'))
        );

        create table if not exists orders(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            note TEXT,
            total real not null default 0,
            create_at text not null default (datetime('now'))
        );

        create table if not exists order_items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            qty real not null check(qty>=0),
            unit_price real not null check(unit_price>=0),
            line_total real not null check(line_total>=0),
            FOREIGN KEY(product_id) REFERENCES products(id) on delete RESTRICT,
            FOREIGN KEY(order_id) REFERENCES orders(id) on delete cascade
        );

        create table if not exists cart_items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL unique,
            name TEXT not null,
            unit TEXT,
            qty real not null check(qty>=0),
            unit_price real not null check(unit_price>=0),
            line_total real not null check(line_total>=0),
            add_at text not null default (datetime('now')),
            FOREIGN KEY(product_id) REFERENCES products(id) on delete RESTRICT
        );
    `)

}
export async function seedIfEmpty() {
    const db=await getDb();
    const row= await db.getFirstAsync<{c:number}>(
        `select count(*) as c from products;`
    )
    if((row?.c ?? 0)>0) return;

    const samples=[
        { name: "Táo Fuji", price: 35000, unit: "kg" },
        { name: "Cam Mỹ", price: 65000, unit: "kg" },
        { name: "Mì gói", price: 4500, unit: "pcs" },
    ];
    for (const s of samples){
        await db.runAsync(
            `insert into products (name, price, unit ) VALUES(?,?,?)`,
            [s.name,s.price,s.unit]
        )
    }
}