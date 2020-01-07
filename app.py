import os
import cv2
import json
import time
import uuid
import base64
import web
from PIL import Image
web.config.debug  = True
render = web.template.render('templates', base='base')

from model import *

billList = ['图片种类预测']

class KIND:
    def GET(self):
        post = {}
        post['postName'] = 'kind'  ##请求地址
        post['height'] = 1000
        post['H'] = 1000
        post['width'] = 600
        post['W'] = 600
        post['uuid'] = uuid.uuid1().__str__()
        post['billList'] = billList
        return render.kind(post)

    def POST(self):
        data = web.data()
        data = json.loads(data.decode('utf-8'))

        imgString = data['imgString'].encode().split(b';base64,')[-1]
        imgString = base64.b64decode(imgString)
        jobid = uuid.uuid1().__str__()
        path = 'output/{}.jpg'.format(jobid)
        with open(path, 'wb') as f:
            f.write(imgString)

        # 签名个数
        result = predict(path)
        result = str(result[0][1])

        with open(path, "rb") as imageFile:
            image_read = imageFile.read()
            imgString = base64.b64encode(image_read)
            imageFile.close()

        os.remove(path)
        print("[INFO] Successfully deleted", path)

        return json.dumps({'imgString': imgString.decode('ascii'),
                        'kind': result})

urls = ('/kind', 'KIND')


if __name__ == "__main__":
      app = web.application(urls, globals())
      app.run()