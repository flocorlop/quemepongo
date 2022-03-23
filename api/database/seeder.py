import sqlite3 as sql

DB_PATH = 'C:\\bbdd_tfg\\outfits.db'

def createDB():
    conn = sql.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE outfits (
        id integer,
        percentage text,
        title text,
        imageURL text,
        description text
        )""")
    conn.commit()
    conn.close()
    print('creada bd')

def addValues():
    conn = sql.connect(DB_PATH)
    cursor = conn.cursor()
    data = [
        (1,"95", "Summer outfit","https://www.stylevore.com/wp-content/uploads/2019/06/summer-style-fashion-ootd.jpg", "White top with high waist jeans" ),
        (2,"86", "Summer outfit for men", "http://www.instaloverz.com/wp-content/uploads/2017/04/22.-Preppy-Mens-Outfits.jpg", "White polo with squared pant and moccasins" ),
        (3,"70", "Feria", "https://www.clara.es/medio/2019/04/26/looks-feria-de-abril-rocio-osorno_2898f638_1000x1500.jpg", "Rocio Osorno" )
    ]
    print('inicio valores')
    cursor.executemany("""INSERT INTO outfits VALUES (?, ?, ?, ?, ?)""", data)
    conn.commit()
    conn.close()
    print('valores introducidos')


if __name__ == '__main__':
    createDB()
    addValues()
    print("db ok")