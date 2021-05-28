const config = require('config')

module.exports = function (email, token, name) {
    return {
        to: email,
        from: config.get('EMAIL_FROM'),
        subject: `Запрос на сброс пароля`,
        html: `
        <div style="width:100%; height: 100%; background-color:#F5F8FA;">
        <div style="height:480px; width:410px;margin: 0 auto; background-color:#fff; padding: 20px;">
        <div style="text-align: right">
        <a href="${config.get(
            'BASE_URL_ClIENT'
        )}" style="text-decoration:none;border-style:none;border:0px;padding:0px;margin:0px;color:#1da1f2;" target="_blank">
            <img src="https://ci5.googleusercontent.com/proxy/ObVgYJQgSjo41l1NQLa34y0cx059F8lNASu5OoCyxyuCxcV7dd5weiertHgR-sX4Sez9dT6iROiAH7iNxp3aDP98pJwyMQJY15cXJDykaOqgncPl=s0-d-e1-ft#https://ea.twimg.com/email/self_serve/media/icon_twitter_blue.png" width="32" alt="Twitter" title="Twitter" style="margin:0px;padding:0px;display:inline-block;border:none;outline:none">
            </a>
            </div>
        <h3 style="font-size:24px; line-height: 32px;">Сбросить пароль?</h3>
        <p style="font-size:16px; line-height: 22px;"> Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
        <p style="font-size:16px; line-height: 22px;">Введите код указаный ниже:</p>
        <p><strong style="font-size: 15px">
        ${token}
        </strong></p>
        <p style="font-size:16px; line-height: 22px;">
        Коды подтверждения действуют в течение одного часа
        </p>
        </div>
        </div>
        `,
    }
}
