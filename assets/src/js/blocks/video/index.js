/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import components
 */
import videoEdit from './edit';
import videoSave from './save';

registerBlockType("aleister-prime/video", {
    title: __( "Video" ),
    description: __( "Embed YouTube video." ),
    icon: 'dashicons dashicons-youtube aleister-dashicons',
    category: 'aleister-prime',
    attributes: {
        heading: {
            type: 'string',
            default: 'Latest Video',
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
        video: {
            type: 'string',
            default: ''
        },
    },
    edit: videoEdit,
    save: videoSave,
});
