<img width="150" height="150" align="left" style="float: left; margin: 0 10px 0 0;" alt="🤖 Zorion" src="https://cdn.discordapp.com/attachments/1170051946682515634/1172825570724286524/Letter-Z-PNG-Free-Download-1.png?ex=6561b9ee&is=654f44ee&hm=0afb778b94c197cdb0066c86a3c78ee31bfa8f1ee0bf7e9d2f1662a760f2695b&">

# ZorionBot

[![⭐ GitHub](https://img.shields.io/github/stars/LukeSkywalker01/ZorionBot.svg?style=social&label=Stars&style=flat)](https://github.com/LukeSkywalker01/ZorionBot/stargazers)
[![](https://img.shields.io/badge/discord.js-v14.13.0-blue.svg?logo=npm)](https://github.com/discordjs)
[![Discord Server](https://discord.com/api/guilds/1112108219788181656/widget.png)](https://discord.gg/qfDS3ktNMe)
[![](https://img.shields.io/github/languages/top/LukeSkywalker01/ZorionBot)]()

Zorion es un bot multifunción, multilenguaje, programado en [Discord.js](https://discord.js.org) y [Mongoose](https://mongoosejs.com/docs/api.html) por [LukeSkywalker](https://github.com/LukeSkywalker01).  
¡Añade una ⭐ al repositorio para promocionar el proyecto!

## Requisitos

1. Token de Discord Developers **[Guía](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. Node.js `v18.12.0` o una más reciente version 18.

## 🚀 Guía de Instalación

```sh
git clone https://github.com/LukeSkywalker01/Zorion
cd Zorion
npm install
```

⚠️ Luego de la instalación, antes de ejecutar `node index.js`, deberás de crear un archivo `.env` y añadir las credenciales tal como se muestra más abajo.

## ⚙️ Configuración

Siguiendo el formato más abajo, deberás de crear un archivo llamado `.env` para añadir las credenciales.

⚠️ **Nota: Nunca publiques o muestres tu token o las claves de API's públicamente**

```json
token = "token del bot"
prefix = "prefijo predefinido"
mongoURL =  "url de Mongo para que se conecte el bot"
```

Para facilitar el proceso de configuración puede ejecutar el comando

```cmd
npm run config
```

el cual le pedirá los datos para la creación automáctica del archivo `.env`. Los datos que no tenga a la mano podrá omitirlos con un simple `Enter` y ejecutar el script mas tarde sin necesidad de rellenar nuevamente los datos ya dados; _no se preocupe que los datos omitidos no se sobrescribirán._

🚨 **Como mínimo deberás de rellenar hasta el MONGO_URL para poder iniciarlo, el resto te darán error los comandos que lo usen.** 🚨

## 🛠️ Características

### Bot En Desarrollo

Lista de funciones:

-   ✉️ Prefijo global o prefijo por servidor.
-   🇪🇸 Multilenguaje (Español, Inglés y Portués)
-   ⚙️ Configuración en Mongo por servidor (prefijo, comandos, etc...)
-   😀 Comandos únicos en embeds

### Categorías de comandos

Zorion tiene **3 categorías**(Por el momento):

-   ⚙️ **Configuración**
-   😂 **Diversión**
-   🚩 **Información y Utilidades**

## 📎 Links

-   [Discord](https://discord.gg/qfDS3ktNMe)
-   [Github](https://github.com/LukeSkywalker01)

## 🤝 Contribuciones

Antes de **reportar un error**, por favor asegúrate de que no ha sido reportado/sugerido anteriormente.  
Si tienes cualquier duda, pregúntanosla en el [servidor de Discord](https://discord.gg/qfDS3ktNMe) en vez de crear un reporte.
Si quieres contribuir, siéntete libre de bifurcar el repositorio y solicitar una pull request.

## 📜 Licencia

Zorion esta licenciado bajo la licencia GPL 3.0. Revisa el archivo `LICENSE` para más información. Si planeas usar cualquier parte de este código base en tu propio bot, estaría agradecido si se me incluyese en los créditos.