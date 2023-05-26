/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import components
 */
import musicEdit from './edit';
import musicSave from './save';

registerBlockType("aleister-prime/music", {
    title: __( "3 Column Embed" ),
    description: __( "Static column layout for embeds." ),
    icon: 'dashicons dashicons-embed-audio aleister-dashicons',
    category: 'aleister-prime',
    attributes: {
        heading: {
            type: 'string',
            default: 'Latest Tracks',
        },
        headingColor: {
            type: 'string',
            default: 'white',
        },
        backgroundColor1: {
            type: 'string',
            default: '#ad0000'
        },
        backgroundColor2: {
            type: 'string',
            default: '#ad0000'
        },
        link1: {
            type: 'string',
            default: ''
        },
        link2: {
            type: 'string',
            default: ''
        },
        link3: {
            type: 'string',
            default: ''
        }
    },
    edit: musicEdit,
    save: musicSave,
});
