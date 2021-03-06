from django.core.validators import ValidationError

prefix = "/"


def menu_list(request):
    return {'menu_list': [
        # ['/new/bank/shop/', 'Магазин'],
        ['https://goto.msk.ru/test/' , 'Главная'],
        # ['%s/camp/' % prefix, 'Лагерь'],
        # ['%s/hackathon/' % prefix, 'Хакатон'],
        # ['%s/lectoriy/' % prefix, 'Лекторий'],
        # ['%s/coworking/' % prefix, 'Коворкинг'],
        ['https://goto.msk.ru/test/about_us/', 'О нас']
    ]}


def validation_error_to_boolean(f, val):
    try:
        f(val)
        return False
    except ValidationError:
        return True
