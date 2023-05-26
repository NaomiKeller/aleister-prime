/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import components
 */
import heroEdit from './edit';
import heroSave from './save';

registerBlockType("aleister-prime/hero", {
    title: __( "Hero Banner" ),
    description: __( "Hero Banner" ),
    icon: 'dashicons dashicons-align-full-width aleister-dashicons',
    category: 'aleister-prime',
    attributes: {
        heading: {
            type: 'string',
            default: 'Aleister Strange',
        },
        headingFont: {
            type: 'string',
            default: 'Ubuntu'
        },
        headingColorLeft: {
            type: 'string',
            default: '#fff',
        },
        headingColorRight: {
            type: 'string',
            default: '#AD0000',
        },
        headingFontSize: {
            type: 'number',
            default: 60,
        },
        headingFontSizeMobile: {
            type: 'number',
            default: 35,
        },
        headingFontWeight: {
            type: 'number',
            default: 300,
        },
        headingGap: {
            type: 'number',
            default: 14,
        },
        toggleHeadingBgColor: {
            type: 'boolean',
            default: false,
        },
        headingBgColor: {
            type: 'string',
            default: null
        },
        headingBgColorOpacity: {
            type: 'number',
            default: 1
        },
        vertPadding: {
            type: 'number',
            default: 0
        },
        paddingLeft: {
            type: 'number',
            default: 0
        },
        paddingRight: {
            type: 'number',
            default: 0
        },
        borderRadius: {
            type: 'number',
            default: 0
        },
        mediaId: {
            type: 'string',
            default: '',
        },
        heroBgDim: {
            type: 'number',
            default: 30,
        },
        viewEdit: {
            type: 'boolean',
            default: false,
        },
        dataArray: {
            type: 'array',
            default: []
        },
    },
    edit: heroEdit,
    save: heroSave,
});
