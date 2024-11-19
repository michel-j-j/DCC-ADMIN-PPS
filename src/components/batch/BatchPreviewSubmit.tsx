import React, { useState, useEffect } from 'react';
import { useAllFormFields } from 'payload/components/forms';
import { Credential } from 'payload/generated-types';
import BatchCredentialListPreview from '../List/BatchCredentialListPreview';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { CredentialTemplate } from 'payload/generated-types';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { useDocumentInfo } from 'payload/components/utilities';

export type BatchPreviewSubmitProps = {
    refetchBatchCredentials: () => Promise<void>;
    credentialData: PaginatedDocs<Credential>;
};

const BatchPreviewSubmit = React.forwardRef<HTMLElement, BatchPreviewSubmitProps>(
    function BatchPreviewSubmit({ refetchBatchCredentials, credentialData }, ref) {
        const [template, setTemplate] = useState<CredentialTemplate | undefined>();
        const [fields] = useAllFormFields();
        const { id } = useDocumentInfo();

        useEffect(() => {
            if (fields.template.value) {
                fetch(`/api/credential-template/${fields.template.value}`)
                    .then(res => res.json())
                    .then(setTemplate);
            } else {
                setTemplate(undefined);
            }
        }, [fields?.template?.value]);

        return (
            <section
                className="w-full h-full snap-start flex-shrink-0 p-10 overflow-y-auto"
                ref={ref}
            >
                <h2 className="mt-5 text-[--theme-text] text-3xl font-semibold mb-5 font-inter">
                    Confirmacion
                </h2>
                <p className="text-[--theme-text] text-xl font-medium font-inter mb-15">
                    Revise y confirme los detalles de este lote antes de enviar los correos
                    electrónicos de solicitud de credenciales a los usuarios. Asegúrese de que los
                    datos de su lote son correctos antes de enviarlos para su procesamiento.
                </p>

                <Accordion type="single" className="mb-5" defaultValue="batch">
                    <AccordionItem value="batch">
                        <AccordionTrigger>Lote: {fields.title.value}</AccordionTrigger>
                        <AccordionContent>
                            <section className="p-5 rounded-lg bg-white flex flex-col items-start gap-2 mb-5 dark:bg-slate-900">
                                <h5 className="text-slate-600 font-inter text-lg dark:text-slate-400">
                                    Descripcion
                                </h5>
                                <p className="m-0 text-slate-900 font-inter font-normal text-base dark:text-slate-100">
                                    {fields.description.value}
                                </p>
                            </section>

                            <section className="p-5 rounded-lg bg-white flex flex-col items-start gap-2 dark:bg-slate-900">
                                <h5 className="text-slate-600 font-inter text-lg dark:text-slate-400">
                                    Notas Internas
                                </h5>
                                <p className="m-0 text-slate-900 font-inter font-normal text-base dark:text-slate-100">
                                    {fields.internalNotes.value}
                                </p>
                            </section>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" className="mb-5" defaultValue="template">
                    <AccordionItem value="template">
                        <AccordionTrigger>Plantilla: {template?.title}</AccordionTrigger>
                        <AccordionContent>
                            <section className="p-5 rounded-lg bg-white flex flex-col items-start gap-2 mb-5 dark:bg-slate-900">
                                <h5 className="text-slate-600 font-inter text-lg dark:text-slate-400">
                                    Detalles
                                </h5>
                                <p className="m-0 text-slate-900 font-inter font-normal text-base dark:text-slate-100">
                                    {template?.description}
                                </p>
                            </section>

                            <section className="p-5 rounded-lg bg-white flex flex-col items-start gap-2 dark:bg-slate-900">
                                <h5 className="text-slate-600 font-inter text-lg dark:text-slate-400">
                                    Notas Internas
                                </h5>
                                <p className="m-0 text-slate-900 font-inter font-normal text-base dark:text-slate-100">
                                    {template?.internalNotes}
                                </p>
                            </section>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" className="mb-5" defaultValue="credentials">
                    <AccordionItem value="credentials">
                        <AccordionTrigger>Credencial desde CSV</AccordionTrigger>
                        {id && credentialData && (
                            <BatchCredentialListPreview
                                data={credentialData}
                                refetch={refetchBatchCredentials}
                                readOnly={true}
                            />
                        )}
                    </AccordionItem>
                </Accordion>
            </section>
        );
    }
);

export default BatchPreviewSubmit;
