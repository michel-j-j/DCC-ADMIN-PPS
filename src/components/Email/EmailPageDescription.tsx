import React, { useState, useEffect } from 'react';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import { Link } from 'react-router-dom';
import './EmailPageDescription.scss';
import { totalEmailTemplatePublishedQuery } from '../../constants/countQueries';

const EmailPageDescription: React.FC = () => {
    const {
        routes: { admin: adminRoute },
    } = useConfig();

    const [count, setCount] = useState<number | undefined>(0);

    const fetchBatchCredentials = async (page = 1) => {
        const res = await fetch('/api/get-collection-count', {
            method: 'POST',
            body: JSON.stringify({
                collectionName: 'email-template',
                query: totalEmailTemplatePublishedQuery,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (res.status === 200) {
            const data = await res.json();

            setCount(data?.count);
        }
    };

    useEffect(() => {
        fetchBatchCredentials();
    }, []);

    return (
        <div className="header_wrapper">
            <p className="header_paragraph">
                <span className="header_number">{count}</span> Plantillas publicadas
            </p>
            <Link
                className="header_template_button"
                activeClassName="active"
                to={`${adminRoute}/collections/email-template/create`}
            >
                <img className="plus_icon" src="/assets/plus-icon.svg" alt="plus icon" />
                Crear Nueva Plantilla
            </Link>
        </div>
    );
};

export default EmailPageDescription;
