
import os

bodies = os.listdir("articleBodies")

f = open("templates/beforeArticle.html")
beforeArticle = f.read()
f.close()

f = open("templates/afterArticle.html")
afterArticle = f.read()
f.close()


for bodyName in bodies:
    f = open("articleBodies/" + bodyName)
    body = f.read()
    f.close()
    total = beforeArticle + "\n" + body + "\n" + afterArticle
    f = open("www/" + bodyName, 'w')
    f.write(total)
    f.close()


