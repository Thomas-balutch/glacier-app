import psycopg2


try:

    conn = psycopg2.connect(

        host="db",

        database="glacierdb",

        user="glacieruser",

        password="glacierpass"

    )

    print("Connexion OK !")


except Exception as e:

    print("ERREUR :", e)

