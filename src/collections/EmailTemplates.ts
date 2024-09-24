import { CollectionConfig } from 'payload/types';
import CreateEmailTemplate from '../components/email-template/CreateEmailTemplate';
import CodeEditorWithCsvValidation from '../components/email-template/CodeEditorWithCsvValidation';
import EmailPageDescription from '../components/Email/EmailPageDescription';

const placeholderEmailData = `
  <html>
  <body>

    <h2>Hello {{earnerName}}! Obtenga su credencial en el siguiente enlace</h2>
      <p>Credencial: {{credentialName}}</p>
    <a href="{{link}}">{{link}}</a>
    </div>
  </body>

  </html>
`;

const EmailTemplatesCollection: CollectionConfig = {
    slug: 'email-template',
    admin: {
        defaultColumns: ['title', 'id'],
        description: EmailPageDescription,
        useAsTitle: 'title',
        components: {
            views: {
                Edit: CreateEmailTemplate,
            },
        },
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            minLength: 3,
            maxLength: 100,
        },
        {
            name: 'internalNotes',
            type: 'textarea',
            required: false,
            maxLength: 1000,
        },
        {
            name: 'from',
            type: 'text',
            required: false,
            hidden: true,
            admin: { description: 'Example: Bob <bob@gmail.com>' },
        },
        {
            name: 'emailSubjectTitle',
            type: 'text',
            required: false,
            minLength: 3,
            maxLength: 100,
        },
        {
            name: 'emailTemplatesHandlebarsCode', // required
            type: 'code', // required
            admin: {
                language: 'handlebars',
                description:
                    'Escriba una plantilla de correo electrónico utilizando la sintaxis de Handlebars que se utilizará como cuerpo al enviar correos electrónicos.',
                components: { Field: CodeEditorWithCsvValidation },
            },
            defaultValue: placeholderEmailData,
            required: true,
        },
    ],
};

export default EmailTemplatesCollection;
