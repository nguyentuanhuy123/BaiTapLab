
import * as SQLite from "expo-sqlite" 
let _db:SQLite.SQLiteDatabase |null=null;
export async function getDb() {
    if(!_db){
        _db=await SQLite.openDatabaseAsync("shop6.db")
        await _db.execAsync("PRAGMA foreign_keys=ON")
    }
    return _db;
}
export async function ensureSchema() {
    const db=await getDb();
    await db.execAsync(`
        create table if not exists products(
            id INTEGER primary key autoincrement,
            name TEXT not null,
            price real not null,
            unit TEXT,
            create_at text not null default (datetime('now'))
        );
        create table if not exists cart_items(
            id INTEGER primary key autoincrement,
            product_id integer not null unique,
            name text not null,
            unit TEXT,
            qty real not null check(qty>=0),
            unit_price real not null check (unit_price>=0),
            line_total real not null check (line_total>=0),
            add_at text not null default (datetime('now')),
            foreign key(product_id) references products(id) on delete restrict
        );    
    `)
}
export async function seedIfEmpty() {
    const db=await getDb();
    const row=await db.getFirstAsync<{c:number}>(
        `select count(*) as c from products;`
    )
    if((row?.c ??0)>0) return;
    const samples=[
        { name: "Táo Fuji", price: 35000, unit: "kg" },
        { name: "Cam Mỹ", price: 65000, unit: "kg" },
        { name: "Mì gói", price: 4500, unit: "pcs" },
    ];
    for(const s of samples){
        await db.runAsync(
            `insert into products(name, price, unit) values(?,?,?)`,
            [s.name,s.price,s.unit]
        )
    }
}