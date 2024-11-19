/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
    collections: {
        users: User;
        'credential-template': CredentialTemplate;
        'credential-batch': CredentialBatch;
        credential: Credential;
        'email-template': EmailTemplate;
    };
    globals: {};
}
export interface User {
    id: string;
    name?: string;
    updatedAt: string;
    createdAt: string;
    email: string;
    resetPasswordToken?: string;
    resetPasswordExpiration?: string;
    salt?: string;
    hash?: string;
    loginAttempts?: number;
    lockUntil?: string;
    password?: string;
}
export interface CredentialTemplate {
    id: string;
    title: string;
    description?: string;
    internalNotes?: string;
    credentialTemplateJson:
        | {
              [k: string]: unknown;
          }
        | unknown[]
        | string
        | number
        | boolean
        | null;
    updatedAt: string;
    createdAt: string;
    _status?: 'draft' | 'published';
}
export interface CredentialBatch {
    id: string;
    title: string;
    description?: string;
    internalNotes?: string;
    status: string;
    template: string | CredentialTemplate;
    emailTemplate: string | EmailTemplate;
    from?: string;
    csvFields?:
        | {
              [k: string]: unknown;
          }
        | unknown[]
        | string
        | number
        | boolean
        | null;
    updatedAt: string;
    createdAt: string;
    _status?: 'draft' | 'published';
}
export interface EmailTemplate {
    id: string;
    title: string;
    internalNotes?: string;
    from?: string;
    emailSubjectTitle?: string;
    emailTemplatesHandlebarsCode: string;
    updatedAt: string;
    createdAt: string;
    _status?: 'draft' | 'published';
}
export interface Credential {
    id: string;
    credentialName?: string;
    earnerName?: string;
    emailAddress?: string;
    extraFields?:
        | {
              [k: string]: unknown;
          }
        | unknown[]
        | string
        | number
        | boolean
        | null;
    status: string;
    batch: string | CredentialBatch;
    revocationReason?: string;
    revocationDate?: string;
    revokedBy?: string | User;
    updatedAt: string;
    createdAt: string;
}
