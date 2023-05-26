/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import components
 */
import aboutEdit from './edit';
import aboutSave from './save';

registerBlockType("aleister-prime/about", {
    title: __( "About" ),
    description: __( "Static 2 column block for text and image content." ),
    icon: 'dashicons dashicons-columns aleister-dashicons',
    category: 'aleister-prime',
    attributes: {
        heading: {
            type: 'string',
            default: 'about',
        },
        headingColor: {
            type: 'string',
            default: 'black',
        },
        descColor: {
            type: 'string',
            default: 'black'
        },
        backgroundColor1: {
            type: 'string',
            default: '#AD0000'
        },
        backgroundColor2: {
            type: 'string',
            default: '#AD0000'
        },
        imageSelect: {
            type: 'object',
            default: {}
        },
        description: {
            type: 'string',
            default: ''
        },
    },
    edit: aboutEdit,
    save: aboutSave,
});
