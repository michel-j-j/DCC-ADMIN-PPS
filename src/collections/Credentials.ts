import payload from 'payload';
import { CollectionConfig } from 'payload/types';

import ActionsButton from '../components/ActionsButton';
import CredentialStatusCell from '../components/credential/CredentialStatusCell';
import { CREDENTIAL_STATUS } from '../constants/credentials';
import DefaultListView from '../components/List/DefaultListView';
import CreateCredential from '../components/credential/CreateCredential';

const CredentialsCollection: CollectionConfig = {
    slug: 'credential',
    labels: { plural: "Credenciales" },
    admin: {
        defaultColumns: ['credentialName', 'id', 'status', 'actionButton'],
        useAsTitle: 'credentialName',
        disableDuplicate: true,
        hideAPIURL: true,
        components: { views: { List: DefaultListView, Edit: CreateCredential } },
    },
    access: {
        create: () => false,
        update: async ({ id }) => {
            try {
                if (!id) return false;

                const doc = await payload.findByID({ collection: 'credential', id });

                if (!doc) return false;

                return doc.status === CREDENTIAL_STATUS.DRAFT;
            } catch (error) {
                console.error('Error getting update permission for credential!', {
                    error,
                    id,
                });

                return false;
            }
        },
        delete: async ({ id }) => {
            try {
                if (!id) return true;

                const doc = await payload.findByID({ collection: 'credential', id });

                if (!doc) return false;

                return doc.status === CREDENTIAL_STATUS.DRAFT;
            } catch (error) {
                console.error('Error getting delete permission for credential!', {
                    error,
                    id,
                });

                return false;
            }
        },
    },
    fields: [
        { 
            name: 'credentialName', 
            type: 'text', 
            label: 'Nombre de la Credencial' 
        },
        { 
            name: 'earnerName', 
            type: 'text', 
            label: 'Nombre del Beneficiario' 
        },
        { 
            name: 'emailAddress', 
            type: 'email', 
            label: 'Dirección de Correo Electrónico' 
        },
        {
            name: 'extraFields',
            type: 'json',
            label: 'Campos de la Credencial',
            admin: {
                description:
                    'Puede editar y actualizar los valores de los campos adicionales de la credencial en el editor. Presione el botón Guardar para guardar sus cambios.',
            },
        },
        {
            name: 'status',
            label: 'Estados',
            type: 'text',
            required: true,
            defaultValue: CREDENTIAL_STATUS.DRAFT,
            label: 'Estado',
            admin: {
                hidden: true,
                components: { Cell: CredentialStatusCell },
            },
        },
        {
            name: 'batch',
            label: 'Nombre del Lote',
            type: 'relationship',
            required: true,
            relationTo: 'credential-batch',
            hasMany: false,
        },
        { 
          name: 'revocationReason',
          label: "Motivo de la revocación",
          type: 'text', admin: { hidden: true } 
         },
         { 
           name: 'revocationDate', 
           label: 'Fecha de Revocación',
           type: 'date',
           admin: { hidden: true } },
        {
            name: 'revokedBy',
            type: 'relationship',
            label: "Revocado por",
            relationTo: 'users',
            hasMany: false,
            label: 'Revocado Por',
            admin: { hidden: true },
        },
        {
            name: 'actionButton',
            label: 'Botones de Accion',
            type: 'ui',
            admin: { components: { Field: () => null, Cell: ActionsButton } },
        },
    ],
};

export default CredentialsCollection;
