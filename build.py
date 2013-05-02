
import os
from BeautifulSoup import BeautifulSoup

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

    parsedBody = BeautifulSoup(body)
    title = str(parsedBody.find("div", attrs={'class':'articleTitle'}).find('h1').text)

    titleTag = "<title>" + title + " - Mark Soper's Blog</title>"
    beforeArticleWithTitle = beforeArticle.replace("<title></title>", titleTag)

    total = beforeArticleWithTitle + "\n" + body + "\n" + afterArticle
    f = open("www/" + bodyName, 'w')
    f.write(total)
    f.close()


