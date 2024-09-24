import React, { useState, useEffect } from 'react';
import { useModal } from '@faceless-ui/modal';
import { Drawer } from 'payload/dist/admin/components/elements/Drawer';

import ArrowArcLeft from '../svgs/ArrowArcLeft';

import './Revocation.scss';
import { Credential } from 'payload/generated-types';
import { CREDENTIAL_STATUS } from '../../constants/credentials';

export type RevocationWarningProps = {
    credential: Credential;
    slug: string;
};

const RevocationWarning: React.FC<RevocationWarningProps> = ({ slug, credential }) => {
    const [reason, setReason] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [batchName, setBatchName] = useState('');
    const { modalState, closeModal } = useModal();

    const isNotSentYet = credential.status === CREDENTIAL_STATUS.DRAFT;

    const revokeCredential = async () => {
        await fetch(`/api/revoke-credential/${credential.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason }),
        });

        closeModal(slug);
    };

    useEffect(() => {
        if (modalState[slug]?.isOpen) {
            fetch(`/api/credential-batch/${credential.batch}`)
                .then(res => res.json())
                .then(batch => {
                    setBatchName(batch.title);
                });
        }
    }, [slug, modalState[slug]?.isOpen]);

    return (
        <Drawer header={false} slug={slug} gutter={false}>
            <section className="revocation-warning">
                <button type="button" aria-label="Close" onClick={() => closeModal(slug)} />

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        revokeCredential();
                    }}
                >
                    <header role="presentation">
                        <ArrowArcLeft />
                    </header>
                    <h2>{isNotSentYet ? 'Cancel' : 'Revoke'} Credencial?</h2>
                    <p>
                        Al {isNotSentYet ? 'cancelling' : 'revoking'} esta credencial, reconoce la
                        invalidación y retirada inmediata de la credencial expedida.
                    </p>
                    <section>
                        <span>Nombre de la credencial: {credential.credentialName}</span>
                        <span>Nombre de Plantilla: {batchName}</span>
                        <span>Nombre de Beneficiario: {credential.earnerName}</span>
                    </section>
                    <label>
                        Añade un comentario explicando por qué estás{' '}
                        {isNotSentYet ? 'cancelling' : 'revoking'} esta Credencial.
                        <textarea
                            onChange={e => setReason(e.target.value)}
                            value={reason}
                            autoFocus
                        />
                    </label>
                    <label>
                        Escriba el nombre de la credencial que va a{' '}
                        {isNotSentYet ? 'cancelling' : 'revoking'}.
                        <input
                            type="text"
                            onChange={e => setConfirmation(e.target.value)}
                            value={confirmation}
                        />
                    </label>
                    <button disabled={confirmation !== credential.credentialName}>Revocar</button>
                </form>
            </section>
        </Drawer>
    );
};

export default RevocationWarning;
