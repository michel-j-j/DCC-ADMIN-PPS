import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Examples: CollectionConfig = {
    slug: 'examples',
    labels: { plural: "Ejemplos" },
    admin: {
        useAsTitle: 'someField',
    },
    fields: [
        {
            name: 'someField',
            type: 'text',
            label: 'Algún Campo',
        },
    ],
};

export default Examples;
