from removebg import RemoveBg
import os
import sys
from PIL import Image

api = "1DyDLvSvNJYkFYm55XBjf7jw"
path = sys.path[0]+"/img/"+ sys.argv[1]
# print(path)
color = sys.argv[2]
pictureName = sys.argv[1].split(".")
# print("fullPictureName：",fullPictureName)
# print("pictureName：",pictureName)


class identificationPhoto():

    def savePath(self):
        self.path = path

    def selectMan(self):
        rmbg = RemoveBg(api, "error.log")

        print('请稍等正在抠图中...koutu', '\n')
        rmbg.remove_background_from_img_file(self.path)

        print('图片抠图完成koutu1', '\n')

    def changeBackgroundColor(self):
        img = Image.open(sys.path[0]+"/img/"+pictureName[0]+"."+pictureName[1]+"_no_bg."+pictureName[1])
        x, y = img.size
        print(color)
        try:
            match color:
                case "red":
                    change_color = (255, 0, 0)
                case "green":
                    change_color = (0, 255, 0)
                case "blue":
                    change_color = (0, 0, 255)
                case "white":
                    change_color = (255, 255, 255)
            p = Image.new('RGB', img.size, change_color)
            p.paste(img, (0, 0, x, y), img)
            print("pictureName",pictureName)
            picture = '%s_%s.' % (sys.path[0]+"/img/"+pictureName[0], color) + pictureName[1]
            p.save(picture)
            print("换色完成,1")
        except:
            print("改背景色出现错误,2")


if __name__ == '__main__':

    identificationPhoto = identificationPhoto()
    identificationPhoto.savePath()
    if api:
        try:
            identificationPhoto.selectMan()
            identificationPhoto.changeBackgroundColor()
        except:
            pass

    # 直接换背景
    else:
        try:
            identificationPhoto.changeBackgroundColor()
        except:
            pass
