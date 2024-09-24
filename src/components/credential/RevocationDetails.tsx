import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useModal } from '@faceless-ui/modal';
import { Drawer } from 'payload/dist/admin/components/elements/Drawer';

import './Revocation.scss';
import { Credential, User } from 'payload/generated-types';

export type RevocationDetailsProps = {
    credential: Credential;
    slug: string;
};

const RevocationDetails: React.FC<RevocationDetailsProps> = ({ slug, credential }) => {
    const [user, setUser] = useState<User | undefined>();
    const { modalState, closeModal } = useModal();

    useEffect(() => {
        if (modalState[slug]?.isOpen && credential.revokedBy) {
            fetch(`/api/users/${credential.revokedBy}`)
                .then(res => res.json())
                .then(setUser);
        }
    }, [slug, modalState[slug]?.isOpen]);

    return (
        <Drawer header={false} slug={slug} gutter={false}>
            <section className="revocation-details">
                <button type="button" aria-label="Close" onClick={() => closeModal(slug)} />

                <section>
                    <h2>Detalles de Revocacion</h2>

                    <section>
                        <span>Revocado por: {user?.name ?? user?.email ?? 'Unknown'}</span>
                        <span>
                            Revocada el:{' '}
                            {credential.revocationDate
                                ? format(new Date(credential.revocationDate), 'dd/MM/yyyy')
                                : 'Unknown'}
                        </span>
                        <span>Nombre de Credencial: {credential.credentialName}</span>
                        <span>Nombre del Beneficiario: {credential.earnerName}</span>
                    </section>

                    <label>
                        Explicación de la revocación
                        <output>{credential.revocationReason}</output>
                    </label>

                    <button type="button" onClick={() => closeModal(slug)}>
                        Cerrar
                    </button>
                </section>
            </section>
        </Drawer>
    );
};

export default RevocationDetails;
