from flask import Flask, jsonify

from flask_cors import CORS

import psycopg2


app = Flask(__name__)

CORS(app)


# =========================

# Connexion base de données

# =========================

def get_db_connection():

    return psycopg2.connect(

        host="db",

        database="glacierdb",

        user="glacieruser",

        password="glacierpass"

    )


# =========================

# Route : liste des glaciers

# =========================

@app.route("/glaciers")

def get_glaciers():

    conn = get_db_connection()

    cur = conn.cursor()


    cur.execute("""

        SELECT id, name, country, altitude, area_km2, last_update, latitude, longitude

        FROM glaciers

        ORDER BY id;

    """)


    rows = cur.fetchall()


    cur.close()

    conn.close()


    glaciers = []

    for row in rows:

        glaciers.append({

            "id": row[0],

            "name": row[1],

            "country": row[2],

            "altitude": row[3],

            "area_km2": row[4],

            "last_update": row[5].strftime("%Y-%m-%d") if row[5] else None,

            "latitude": row[6],

            "longitude": row[7]

        })


    return jsonify(glaciers)


# =====================================

# Route : historique d’un glacier

# =====================================

@app.route("/glaciers/<int:glacier_id>/history")

def glacier_history(glacier_id):

    conn = get_db_connection()

    cur = conn.cursor()


    cur.execute("""

        SELECT year, area_km2

        FROM glacier_history

        WHERE glacier_id = %s

        ORDER BY year;

    """, (glacier_id,))


    rows = cur.fetchall()


    cur.close()

    conn.close()


    history = []

    for row in rows:

        history.append({

            "year": row[0],

            "area_km2": row[1]

        })


    return jsonify(history)


# =========================

# Lancement de l'application

# =========================

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000, debug=False)

