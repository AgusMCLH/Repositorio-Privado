import { purchasesService } from '../repository/purchases/instance.js';
import cartController from './cart.controller.js';
import productController from './products.controller.js';
import config from '../config/config.js';
import nodemailer from 'nodemailer';
import { logger } from './../middleware/logger.middleware.js';

class PurchasesController {
  async addPurchase(cart, user) {
    //Recupera los productos del carrito que le pase
    let { products } = cart;
    //recupera el correo del usuario
    const { email } = user;
    //Poner un error si no hay email o products
    //declaro el monto de la compra por defecto en 0
    let amount = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].product.stock >= products[i].quantity) {
        amount = amount + products[i].product.price * products[i].quantity;

        products[i].product.stock -= products[i].quantity;

        await cartController.deleteProductFromCart(
          JSON.stringify(cart._id).split('"')[1],
          JSON.stringify(products[i].product._id).split('"')[1]
        );
        await productController.updateProduct(
          products[i].product._id,
          products[i].product
        );
      }
    }
    //genero un code para la compra
    const code = await this.createRandomStringCode();

    await this.sendMail(code, email, amount, products);
    //devuelvo el resultado de la ejecucion del metodo addPurchase del purchasesService
    return await purchasesService.addPurchase({
      code,
      amount,
      purchaser: email,
    });
  }

  async sendMail(code, email, amount, products) {
    const hoy = new Date();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: `${config.Mail_USR}`,
        pass: `${config.Mail_PWD}`,
      },
    });
    let mailOptions = {
      from: `Male Fashion <${config.USER}>`,
      subject: 'Male Fashion - Thanks for your purchase ',
      to: `${email}`,
    };
    mailOptions.html = this.#createHtml(
      hoy.toLocaleDateString(),
      JSON.stringify(amount),
      code,
      JSON.stringify(products.length),
      JSON.stringify(amount + 5)
    );
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(err);
      }
      logger.info('Enviado!');
    });
  }

  // La posibilidad de que salgan dos codigos iguales es de 0.000000000000000000000002% (1 en 4.7e+21)
  async createRandomStringCode() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={[}]":;,<>./?|';
    let code = '';
    for (let i = 0; i < 19; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  #createHtml(date, amount, code, products, Total) {
    logger.debug(
      'date: ' +
        date +
        '\namount: ' +
        amount +
        '\ncode: ' +
        code +
        '\nproducts: ' +
        products +
        '\nTotal: ' +
        Total
    );

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link" />
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link" />
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link" />
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link" />
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="telephone=no" name="format-detection" />
        <title>Nueva plantilla de correo electrC3B3nico 2023-08-07</title>
        <!--[if (mso 16)]>
          <style type="text/css">
            a {
              text-decoration: none;
            }
          </style>
        <![endif]-->
        <!--[if gte mso 9
          ]><style>
            sup {
              font-size: 100% !important;
            }
          </style><!
        [endif]-->
        <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
        <!--[if !mso]><!-- -->
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i"
          rel="stylesheet"
        />
        <!--<![endif]-->
        <style type="text/css">
          .rollover:hover .rollover-first {
            max-height: 0px !important;
            display: none !important;
          }
          .rollover:hover .rollover-second {
            max-height: none !important;
            display: inline-block !important;
          }
          .rollover div {
            font-size: 0;
          }
          u ~ div img + div > div {
            display: none;
          }
          #outlook a {
            padding: 0;
          }
          span.MsoHyperlink,
          span.MsoHyperlinkFollowed {
            color: inherit;
            mso-style-priority: 99;
          }
          a.es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
          }
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
          .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
          }
          .es-header-body a:hover {
            color: #ffffff !important;
          }
          .es-content-body a:hover {
            color: #ed8e20 !important;
          }
          .es-footer-body a:hover {
            color: #333333 !important;
          }
          .es-infoblock a:hover {
            color: #cccccc !important;
          }
          .es-button-border:hover > a.es-button {
            color: #ffffff !important;
          }
          @media only screen and (max-width: 600px) {
            h1 {
              font-size: 32px !important;
              text-align: center;
            }
            h2 {
              font-size: 26px !important;
              text-align: center;
            }
            h3 {
              font-size: 20px !important;
              text-align: center;
            }
            .es-m-p0r {
              padding-right: 0px !important;
            }
            .es-m-p20b {
              padding-bottom: 20px !important;
            }
            *[class='gmail-fix'] {
              display: none !important;
            }
            p,
            a {
              line-height: 150% !important;
            }
            h1,
            h1 a {
              line-height: 120% !important;
            }
            h2,
            h2 a {
              line-height: 120% !important;
            }
            h3,
            h3 a {
              line-height: 120% !important;
            }
            h4,
            h4 a {
              line-height: 120% !important;
            }
            h5,
            h5 a {
              line-height: 120% !important;
            }
            h6,
            h6 a {
              line-height: 120% !important;
            }
            h4 {
              font-size: 24px !important;
              text-align: left;
            }
            h5 {
              font-size: 20px !important;
              text-align: left;
            }
            h6 {
              font-size: 16px !important;
              text-align: left;
            }
            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
              font-size: 32px !important;
            }
            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
              font-size: 26px !important;
            }
            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
              font-size: 20px !important;
            }
            .es-header-body h4 a,
            .es-content-body h4 a,
            .es-footer-body h4 a {
              font-size: 24px !important;
            }
            .es-header-body h5 a,
            .es-content-body h5 a,
            .es-footer-body h5 a {
              font-size: 20px !important;
            }
            .es-header-body h6 a,
            .es-content-body h6 a,
            .es-footer-body h6 a {
              font-size: 16px !important;
            }
            .es-menu td a {
              font-size: 16px !important;
            }
            .es-header-body p,
            .es-header-body a {
              font-size: 16px !important;
            }
            .es-content-body p,
            .es-content-body a {
              font-size: 16px !important;
            }
            .es-footer-body p,
            .es-footer-body a {
              font-size: 16px !important;
            }
            .es-infoblock p,
            .es-infoblock a {
              font-size: 12px !important;
            }
            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3,
            .es-m-txt-c h4,
            .es-m-txt-c h5,
            .es-m-txt-c h6 {
              text-align: center !important;
            }
            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3,
            .es-m-txt-r h4,
            .es-m-txt-r h5,
            .es-m-txt-r h6 {
              text-align: right !important;
            }
            .es-m-txt-j,
            .es-m-txt-j h1,
            .es-m-txt-j h2,
            .es-m-txt-j h3,
            .es-m-txt-j h4,
            .es-m-txt-j h5,
            .es-m-txt-j h6 {
              text-align: justify !important;
            }
            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3,
            .es-m-txt-l h4,
            .es-m-txt-l h5,
            .es-m-txt-l h6 {
              text-align: left !important;
            }
            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
              display: inline !important;
            }
            .es-m-txt-r .rollover:hover .rollover-second,
            .es-m-txt-c .rollover:hover .rollover-second,
            .es-m-txt-l .rollover:hover .rollover-second {
              display: inline !important;
            }
            .es-m-txt-r .rollover div,
            .es-m-txt-c .rollover div,
            .es-m-txt-l .rollover div {
              line-height: 0 !important;
              font-size: 0 !important;
            }
            .es-spacer {
              display: inline-table;
            }
            a.es-button,
            button.es-button {
              font-size: 16px !important;
            }
            .es-m-fw,
            .es-m-fw.es-fw,
            .es-m-fw .es-button {
              display: block !important;
            }
            .es-m-il,
            .es-m-il .es-button,
            .es-social,
            .es-social td,
            .es-menu {
              display: inline-block !important;
            }
            .es-adaptive table,
            .es-left,
            .es-right {
              width: 100% !important;
            }
            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
              width: 100% !important;
              max-width: 600px !important;
            }
            .adapt-img {
              width: 100% !important;
              height: auto !important;
            }
            .es-mobile-hidden,
            .es-hidden {
              display: none !important;
            }
            .es-desk-hidden {
              width: auto !important;
              overflow: visible !important;
              float: none !important;
              max-height: inherit !important;
              line-height: inherit !important;
              display: table-row !important;
            }
            tr.es-desk-hidden {
              display: table-row !important;
            }
            table.es-desk-hidden {
              display: table !important;
            }
            td.es-desk-menu-hidden {
              display: table-cell !important;
            }
            .es-menu td {
              width: 1% !important;
            }
            table.es-table-not-adapt,
            .esd-block-html table {
              width: auto !important;
            }
            .es-social td {
              padding-bottom: 10px;
            }
            .h-auto {
              height: auto !important;
            }
            a.es-button,
            button.es-button {
              display: inline-block !important;
            }
            .es-button-border {
              display: inline-block !important;
            }
          }
        </style>
      </head>
      <body style="width: 100%; height: 100%; padding: 0; margin: 0">
        <div class="es-wrapper-color" style="background-color: #eeeeee">
          <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#eeeeee"></v:fill>
            </v:background>
          <![endif]-->
          <table
            class="es-wrapper"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              background-repeat: repeat;
              background-position: center top;
              background-color: #eeeeee;
            "
          >
            <tr>
              <td valign="top" style="padding: 0; margin: 0">
                <table
                  cellpadding="0"
                  cellspacing="0"
                  class="es-content"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    width: 100%;
                    table-layout: fixed !important;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-content-body"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 600px;
                        "
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 15px;
                              padding-right: 10px;
                              padding-bottom: 15px;
                              padding-left: 10px;
                            "
                          >
                            <!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
                            <table
                              class="es-left"
                              cellspacing="0"
                              cellpadding="0"
                              align="left"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                float: left;
                              "
                            >
                              <tr>
                                <td
                                  align="left"
                                  style="padding: 0; margin: 0; width: 282px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 0; margin: 0; display: none"
                                      ></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
                            <table
                              class="es-right"
                              cellspacing="0"
                              cellpadding="0"
                              align="right"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                float: right;
                              "
                            >
                              <tr>
                                <td
                                  align="left"
                                  style="padding: 0; margin: 0; width: 278px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 0; margin: 0; display: none"
                                      ></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    width: 100%;
                    table-layout: fixed !important;
                  "
                >
                  <tr></tr>
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-header-body"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #044767;
                          width: 600px;
                        "
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#044767"
                        align="center"
                      >
                        <tr>
                          <td
                            align="left"
                            bgcolor="#f3f2ee"
                            style="
                              padding: 30px;
                              margin: 0;
                              background-color: #f3f2ee;
                            "
                          >
                            <!--[if mso]><table style="width:540px" cellpadding="0" cellspacing="0"><tr><td style="width:345px" valign="top"><![endif]-->
                            <table
                              class="es-left"
                              cellspacing="0"
                              cellpadding="0"
                              align="left"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                float: left;
                              "
                            >
                              <tr>
                                <td
                                  class="es-m-p0r es-m-p20b"
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 345px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          font-size: 0px;
                                        "
                                      >
                                        <img
                                          class="adapt-img"
                                          src="https://sukgoc.stripocdn.email/content/guids/55c04a3a-1d94-445b-ace8-61926d632964/images/logo.png"
                                          alt
                                          style="
                                            display: block;
                                            font-size: 16px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                          width="206"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td><td style="width:20px"></td><td style="width:175px" valign="top"><![endif]-->
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              align="right"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr class="es-hidden">
                                <td
                                  class="es-m-p20b"
                                  align="left"
                                  style="padding: 0; margin: 0; width: 175px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 5px;
                                          font-size: 0;
                                        "
                                      >
                                        <table
                                          width="100%"
                                          height="100%"
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            border-collapse: collapse;
                                            border-spacing: 0px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              style="
                                                padding: 0;
                                                margin: 0;
                                                border-bottom: 2px solid #e63334;
                                                background: none 0% 0% repeat scroll
                                                  #ffffff;
                                                height: 1px;
                                                width: 100%;
                                                margin: 0px;
                                              "
                                            ></td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding: 0; margin: 0">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          align="right"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            border-collapse: collapse;
                                            border-spacing: 0px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="left"
                                              style="padding: 0; margin: 0"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                role="presentation"
                                                style="
                                                  mso-table-lspace: 0pt;
                                                  mso-table-rspace: 0pt;
                                                  border-collapse: collapse;
                                                  border-spacing: 0px;
                                                "
                                              >
                                                <tr>
                                                  <td
                                                    align="right"
                                                    style="padding: 0; margin: 0"
                                                  >
                                                    <p
                                                      style="
                                                        margin: 0;
                                                        mso-line-height-rule: exactly;
                                                        font-family: 'open sans',
                                                          'helvetica neue',
                                                          helvetica, arial,
                                                          sans-serif;
                                                        line-height: 21px;
                                                        letter-spacing: 0;
                                                        color: #000000;
                                                        font-size: 14px;
                                                      "
                                                    >
                                                      <a
                                                        target="_blank"
                                                        style="
                                                          mso-line-height-rule: exactly;
                                                          text-decoration: none;
                                                          color: #000000;
                                                          font-size: 18px;
                                                          line-height: 22px;
                                                        "
                                                        href="https://diazwebdev.online"
                                                        >Shop</a
                                                      >
                                                    </p>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                            <td
                                              valign="top"
                                              align="left"
                                              style="
                                                padding: 0;
                                                margin: 0;
                                                padding-left: 10px;
                                                font-size: 0;
                                              "
                                            >
                                              <a
                                                href="https://diazwebdev.online"
                                                target="_blank"
                                                style="
                                                  mso-line-height-rule: exactly;
                                                  text-decoration: none;
                                                  color: #ffffff;
                                                  font-size: 14px;
                                                "
                                                ><img
                                                  src="https://sukgoc.stripocdn.email/content/guids/CABINET_bc8136b42ded7e79a7cbf965c90066428883525c9c82aebbc8ca662b1ef5aa6f/images/shoppingcarticon.png"
                                                  alt
                                                  style="
                                                    display: block;
                                                    font-size: 16px;
                                                    border: 0;
                                                    outline: none;
                                                    text-decoration: none;
                                                  "
                                                  width="27"
                                              /></a>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    width: 100%;
                    table-layout: fixed !important;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-content-body"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #ffffff;
                          width: 600px;
                        "
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              padding: 0;
                              margin: 0;
                              padding-top: 40px;
                              padding-right: 35px;
                              padding-left: 35px;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 530px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          margin: 0;
                                          padding-right: 35px;
                                          padding-left: 35px;
                                          padding-top: 25px;
                                          padding-bottom: 25px;
                                          font-size: 0;
                                        "
                                      >
                                        <a
                                          target="_blank"
                                          href="https://diazwebdev.online/"
                                          style="
                                            mso-line-height-rule: exactly;
                                            text-decoration: none;
                                            color: #ed8e20;
                                            font-size: 16px;
                                          "
                                          ><img
                                            src="https://sukgoc.stripocdn.email/content/guids/CABINET_75694a6fc3c4633b3ee8e3c750851c02/images/67611522142640957.png"
                                            alt
                                            style="
                                              display: block;
                                              font-size: 16px;
                                              border: 0;
                                              outline: none;
                                              text-decoration: none;
                                            "
                                            width="120"
                                        /></a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 10px;
                                        "
                                      >
                                        <h2
                                          style="
                                            margin: 0;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            mso-line-height-rule: exactly;
                                            letter-spacing: 0;
                                            font-size: 30px;
                                            font-style: normal;
                                            font-weight: bold;
                                            line-height: 36px;
                                            color: #333333;
                                          "
                                        >
                                          Thank You For Your Order!
                                        </h2>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-top: 15px;
                                          padding-bottom: 20px;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 24px;
                                            letter-spacing: 0;
                                            color: #777777;
                                            font-size: 16px;
                                          "
                                        >
                                          Thank you for choosing us! Your purchase
                                          means a lot to our team. We are truly
                                          grateful for your support.
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    width: 100%;
                    table-layout: fixed !important;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-content-body"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #ffffff;
                          width: 600px;
                        "
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              padding: 0;
                              margin: 0;
                              padding-right: 35px;
                              padding-left: 35px;
                              padding-top: 20px;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 530px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        bgcolor="#eeeeee"
                                        align="left"
                                        style="
                                          margin: 0;
                                          padding-right: 10px;
                                          padding-left: 10px;
                                          padding-bottom: 10px;
                                          padding-top: 10px;
                                        "
                                      >
                                        <table
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            border-collapse: collapse;
                                            border-spacing: 0px;
                                            width: 500px;
                                          "
                                          class="cke_show_border"
                                          cellspacing="1"
                                          cellpadding="1"
                                          border="0"
                                          align="left"
                                          role="presentation"
                                        >
                                          <tr>
                                            <td
                                              width="80%"
                                              style="padding: 0; margin: 0"
                                            >
                                              <h4
                                                style="
                                                  margin: 0;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  mso-line-height-rule: exactly;
                                                  letter-spacing: 0;
                                                  font-size: 16px;
                                                  font-style: normal;
                                                  font-weight: normal;
                                                  line-height: 19px;
                                                  color: #333333;
                                                "
                                              >
                                                Order Confirmation #
                                              </h4>
                                            </td>
                                            <td
                                              width="20%"
                                              style="padding: 0; margin: 0"
                                            >
                                              <h4
                                                style="
                                                  margin: 0;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  mso-line-height-rule: exactly;
                                                  letter-spacing: 0;
                                                  font-size: 16px;
                                                  font-style: normal;
                                                  font-weight: normal;
                                                  line-height: 19px;
                                                  color: #333333;
                                                "
                                              >
                                                ${code}
                                              </h4>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style="
                              padding: 0;
                              margin: 0;
                              padding-right: 35px;
                              padding-left: 35px;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 530px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          margin: 0;
                                          padding-right: 10px;
                                          padding-left: 10px;
                                          padding-bottom: 10px;
                                          padding-top: 10px;
                                        "
                                      >
                                        <table
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            border-collapse: collapse;
                                            border-spacing: 0px;
                                            width: 500px;
                                          "
                                          class="cke_show_border"
                                          cellspacing="1"
                                          cellpadding="1"
                                          border="0"
                                          align="left"
                                          role="presentation"
                                        >
                                          <tr>
                                            <td
                                              style="
                                                padding: 5px 10px 5px 0;
                                                margin: 0;
                                              "
                                              width="80%"
                                              align="left"
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-rule: exactly;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  line-height: 24px;
                                                  letter-spacing: 0;
                                                  color: #333333;
                                                  font-size: 16px;
                                                "
                                              >
                                                Purchased Item (${products})
                                              </p>
                                            </td>
                                            <td
                                              style="padding: 5px 0; margin: 0"
                                              width="20%"
                                              align="left"
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-rule: exactly;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  line-height: 24px;
                                                  letter-spacing: 0;
                                                  color: #333333;
                                                  font-size: 16px;
                                                "
                                              >
                                                $${amount}
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="
                                                padding: 5px 10px 5px 0;
                                                margin: 0;
                                              "
                                              width="80%"
                                              align="left"
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-rule: exactly;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  line-height: 24px;
                                                  letter-spacing: 0;
                                                  color: #333333;
                                                  font-size: 16px;
                                                "
                                              >
                                                Shipping + Handling
                                              </p>
                                            </td>
                                            <td
                                              style="padding: 5px 0; margin: 0"
                                              width="20%"
                                              align="left"
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-rule: exactly;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  line-height: 24px;
                                                  letter-spacing: 0;
                                                  color: #333333;
                                                  font-size: 16px;
                                                "
                                              >
                                                $
                                                <span style="color: #ff0000"
                                                  ><strong>FREE</strong></span
                                                >
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="
                                                padding: 5px 10px 5px 0;
                                                margin: 0;
                                              "
                                              width="80%"
                                              align="left"
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-rule: exactly;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  line-height: 24px;
                                                  letter-spacing: 0;
                                                  color: #333333;
                                                  font-size: 16px;
                                                "
                                              >
                                                Sales Tax
                                              </p>
                                            </td>
                                            <td
                                              style="padding: 5px 0; margin: 0"
                                              width="20%"
                                              align="left"
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-rule: exactly;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  line-height: 24px;
                                                  letter-spacing: 0;
                                                  color: #333333;
                                                  font-size: 16px;
                                                "
                                              >
                                                $5.00
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          margin: 0;
                                          padding-right: 10px;
                                          padding-left: 10px;
                                          padding-bottom: 10px;
                                          padding-top: 10px;
                                        "
                                      >
                                        <table
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            border-collapse: collapse;
                                            border-spacing: 0px;
                                            width: 500px;
                                          "
                                          class="cke_show_border"
                                          cellspacing="1"
                                          cellpadding="1"
                                          border="0"
                                          align="left"
                                          role="presentation"
                                        >
                                          <tr>
                                            <td
                                              style="
                                                padding: 5px 10px 5px 0;
                                                margin: 0;
                                              "
                                              width="80%"
                                              align="left"
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-rule: exactly;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  line-height: 24px;
                                                  letter-spacing: 0;
                                                  color: #333333;
                                                  font-size: 16px;
                                                "
                                              >
                                                TOTAL
                                              </p>
                                            </td>
                                            <td
                                              style="padding: 5px 0; margin: 0"
                                              width="20%"
                                              align="left"
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-rule: exactly;
                                                  font-family: 'open sans',
                                                    'helvetica neue', helvetica,
                                                    arial, sans-serif;
                                                  line-height: 24px;
                                                  letter-spacing: 0;
                                                  color: #333333;
                                                  font-size: 16px;
                                                "
                                              >
                                                $${Total}
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 40px;
                              padding-right: 35px;
                              padding-left: 35px;
                              padding-bottom: 40px;
                            "
                          >
                            <!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
                            <table
                              class="es-left"
                              cellspacing="0"
                              cellpadding="0"
                              align="left"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                float: left;
                              "
                            >
                              <tr>
                                <td
                                  class="es-m-p20b"
                                  align="left"
                                  style="padding: 0; margin: 0; width: 255px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 15px;
                                        "
                                      >
                                        <h4
                                          style="
                                            margin: 0;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            mso-line-height-rule: exactly;
                                            letter-spacing: 0;
                                            font-size: 16px;
                                            font-style: normal;
                                            font-weight: normal;
                                            line-height: 19px;
                                            color: #333333;
                                          "
                                        >
                                          Delivery Address
                                        </h4>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 10px;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 24px;
                                            letter-spacing: 0;
                                            color: #333333;
                                            font-size: 16px;
                                          "
                                        >
                                          675 Massachusetts Avenue
                                        </p>
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 24px;
                                            letter-spacing: 0;
                                            color: #333333;
                                            font-size: 16px;
                                          "
                                        >
                                          11th Floor
                                        </p>
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 24px;
                                            letter-spacing: 0;
                                            color: #333333;
                                            font-size: 16px;
                                          "
                                        >
                                          Cambridge, MA 02139
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
                            <table
                              class="es-right"
                              cellspacing="0"
                              cellpadding="0"
                              align="right"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                float: right;
                              "
                            >
                              <tr>
                                <td
                                  align="left"
                                  style="padding: 0; margin: 0; width: 255px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 15px;
                                        "
                                      >
                                        <h4
                                          style="
                                            margin: 0;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            mso-line-height-rule: exactly;
                                            letter-spacing: 0;
                                            font-size: 16px;
                                            font-style: normal;
                                            font-weight: normal;
                                            line-height: 19px;
                                            color: #333333;
                                          "
                                        >
                                          Estimated Delivery Date
                                        </h4>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="left"
                                        style="padding: 0; margin: 0"
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 24px;
                                            letter-spacing: 0;
                                            color: #333333;
                                            font-size: 16px;
                                          "
                                        >
                                          ${date}
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    width: 100%;
                    table-layout: fixed !important;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-content-body"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #1b9ba3;
                          width: 600px;
                        "
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#1b9ba3"
                        align="center"
                      >
                        <tr>
                          <td
                            align="left"
                            bgcolor="#f3f2ee"
                            style="
                              margin: 0;
                              padding-right: 35px;
                              padding-left: 35px;
                              padding-top: 35px;
                              padding-bottom: 35px;
                              background-color: #f3f2ee;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 530px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-top: 25px;
                                        "
                                      >
                                        <h2
                                          style="
                                            margin: 0;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            mso-line-height-rule: exactly;
                                            letter-spacing: 0;
                                            font-size: 24px;
                                            font-style: normal;
                                            font-weight: bold;
                                            line-height: 29px;
                                            color: #000000;
                                          "
                                        >
                                          Get 25% off your next order.
                                        </h2>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          margin: 0;
                                          padding-right: 10px;
                                          padding-bottom: 15px;
                                          padding-left: 10px;
                                          padding-top: 30px;
                                        "
                                      >
                                        <span
                                          class="es-button-border"
                                          style="
                                            border-style: solid;
                                            border-color: transparent;
                                            background: #000000;
                                            border-width: 0px;
                                            display: inline-block;
                                            border-radius: 5px;
                                            width: auto;
                                          "
                                          ><a
                                            href="https://diazwebdev.online/"
                                            class="es-button"
                                            target="_blank"
                                            style="
                                              mso-style-priority: 100 !important;
                                              text-decoration: none !important;
                                              mso-line-height-rule: exactly;
                                              color: #ffffff;
                                              font-size: 18px;
                                              padding: 15px 30px 15px 30px;
                                              display: inline-block;
                                              background: #000000;
                                              border-radius: 5px;
                                              font-family: 'open sans',
                                                'helvetica neue', helvetica, arial,
                                                sans-serif;
                                              font-weight: normal;
                                              font-style: normal;
                                              line-height: 22px;
                                              width: auto;
                                              text-align: center;
                                              letter-spacing: 0;
                                              mso-padding-alt: 0;
                                              mso-border-alt: 10px solid #000;
                                            "
                                            >Awesome</a
                                          ></span
                                        >
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellpadding="0"
                  cellspacing="0"
                  class="es-footer"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    width: 100%;
                    table-layout: fixed !important;
                    background-color: transparent;
                    background-repeat: repeat;
                    background-position: center top;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-footer-body"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #ffffff;
                          width: 600px;
                        "
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-right: 35px;
                              padding-left: 35px;
                              padding-bottom: 40px;
                              padding-top: 35px;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 530px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 10px;
                                          margin: 0;
                                          font-size: 0px;
                                        "
                                      >
                                        <img
                                          src="https://sukgoc.stripocdn.email/content/guids/55c04a3a-1d94-445b-ace8-61926d632964/images/small_logo.png"
                                          alt="Male Fashion Logo"
                                          style="
                                            display: block;
                                            font-size: 12px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                          title="Male Fashion Logo"
                                          width="37"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 35px;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 21px;
                                            letter-spacing: 0;
                                            color: #333333;
                                            font-size: 14px;
                                          "
                                        >
                                          <strong>675 Massachusetts Avenue </strong>
                                        </p>
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 21px;
                                            letter-spacing: 0;
                                            color: #333333;
                                            font-size: 14px;
                                          "
                                        >
                                          <strong>Cambridge, MA 02139</strong>
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        esdev-links-color="#777777"
                                        align="left"
                                        class="es-m-txt-c"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 5px;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 21px;
                                            letter-spacing: 0;
                                            color: #777777;
                                            font-size: 14px;
                                          "
                                        >
                                          If you didn't create an account using this
                                          email address, please ignore this email
                                          or&nbsp;<u
                                            ><a
                                              target="_blank"
                                              style="
                                                mso-line-height-rule: exactly;
                                                text-decoration: none;
                                                color: #777777;
                                                font-size: 14px;
                                              "
                                              class="unsubscribe"
                                              href=""
                                              >unsubscribe</a
                                            ></u
                                          >.
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    width: 100%;
                    table-layout: fixed !important;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-content-body"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 600px;
                        "
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 30px;
                              padding-right: 20px;
                              padding-bottom: 30px;
                              padding-left: 20px;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 560px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 0; margin: 0; display: none"
                                      ></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
    `;
  }
}

export const purchasesController = new PurchasesController();
