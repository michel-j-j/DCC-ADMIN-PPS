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
    labels: { plural: "Plantillas de Correo Electrónico" },
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
            label: 'Título',
        },
        {
            name: 'internalNotes',
            type: 'textarea',
            required: false,
            maxLength: 1000,
            label: 'Notas Internas',
        },
        {
            name: 'from',
            type: 'text',
            required: false,
            hidden: true,
            label: 'Remitente',
            admin: { description: 'Ejemplo: Bob <bob@gmail.com>' },
        },
        {
            name: 'emailSubjectTitle',
            type: 'text',
            required: false,
            minLength: 3,
            maxLength: 100,
            label: 'Asunto del Correo Electrónico',
        },
        {
            name: 'emailTemplatesHandlebarsCode',
            type: 'code',
            label: 'Plantilla de Correo Electrónico (Handlebars)',
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
