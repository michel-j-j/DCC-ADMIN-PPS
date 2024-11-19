import { CollectionConfig } from 'payload/types';
import CreateTemplate from '../components/template/CreateTemplate';
import TemplatePageDescription from '../components/template/TemplatePageDescription';
import CodeEditorWithCsvValidation from '../components/template/CodeEditorWithCsvValidation';

const CredentialsTemplatesCollection: CollectionConfig = {
    slug: 'credential-template',
    labels: { plural: "Plantillas de Credenciales" },
    admin: {
        defaultColumns: ['title', 'id'],
        useAsTitle: 'title',
        description: TemplatePageDescription,
        components: {
            views: {
                Edit: CreateTemplate,
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
            name: 'description',
            type: 'textarea',
            required: false,
            maxLength: 1000,
            label: 'Descripción',
        },
        {
            name: 'internalNotes',
            type: 'textarea',
            required: false,
            maxLength: 1000,
            label: 'Notas Internas',
        },
        {
            name: 'credentialTemplateJson',
            type: 'json',
            label: 'Plantilla de Credencial (JSON)',
            admin: {
                description:
                    'Escriba una plantilla de credencial usando la sintaxis de Handlebars que se utilizará para crear credenciales.',
                components: { Field: CodeEditorWithCsvValidation },
            },
            required: true,
        },
    ],
};

export default CredentialsTemplatesCollection;
