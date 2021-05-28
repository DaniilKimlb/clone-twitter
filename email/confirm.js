const config = require('config')

module.exports = function (email, token) {
    return {
        to: email,
        from: config.get('EMAIL_FROM'),
        subject: `${token} - ваш код подтверждение`,
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
        <h3 style="font-size:24px; font-height: 32px;">Подтвердите свой адрес электронной почты</h3>
        <p style="font-size:16px; font-height: 22px;">До создания Вашей учетной записи в Твиттере
        остался всего один шаг. Мы хотим убедиться, что Вы
        указали правильный адрес электронной почты,
        поэтому просим Вас его подтвердить.</p>
        <p style="font-size:16px; font-height: 22px;">Введите этот проверочный код, чтобы начать пользоваться Твиттером:
        <br/><strong style="font-size:32px">${token}</strong><br/>
        Коды подтверждения действуют в течение одного часа
        </p>
        <p style="font-size:16px; font-height: 22px;">
        Спасибо! <br/>
        Твиттер</p>
        </div>
        </div>
        `,
    }
}
