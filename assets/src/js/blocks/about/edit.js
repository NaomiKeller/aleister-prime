/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { ColorPalette, PanelBody, Button, Tooltip } from '@wordpress/components';
import { InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Export component
 */
export default class aboutEdit extends Component {

    render() {
        const { attributes, setAttributes } = this.props;
        const { 
            heading,
            headingColor,
            backgroundColor1,
            backgroundColor2,
            imageSelect,
            description,
            descColor,
        } = attributes;

        const headingStyle = {};
        headingColor && (
            headingStyle.color = headingColor
        );

        const descStyle = {};
        descColor && (
            descStyle.color = descColor
        );

        const backgroundStyle = {};
        backgroundColor1 && (
            backgroundStyle.background = 'linear-gradient(180deg, '+backgroundColor1+', '+backgroundColor2+')'
        );

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__("Color Settings")} initialOpen={true}>
                        <span className="panel-label">Heading Color</span>
                        <ColorPalette
                            value={ headingColor }
                            onChange={ ( headingColor ) => setAttributes({headingColor}) }
                        />
                        <span className="panel-label">Description Color</span>
                        <ColorPalette
                            value={ descColor }
                            onChange={ ( descColor ) => setAttributes({descColor}) }
                        />
                        <span className="panel-label">Gradient Color 1</span>
                        <ColorPalette
                            value={ backgroundColor1 }
                            onChange={ ( backgroundColor1 ) => setAttributes({backgroundColor1}) }
                        />
                        <span className="panel-label">Gradient Color 2</span>
                        <ColorPalette
                            value={ backgroundColor2 }
                            onChange={ ( backgroundColor2 ) => setAttributes({backgroundColor2}) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="about-block" style={backgroundStyle}>
                    <div className="container">
                        <div className="heading-wrap">
                            <RichText
                                tagName="h2"
                                value={ heading }
                                onChange={ ( heading ) => setAttributes( { heading } ) }
                                placeholder={ __( 'Heading...' ) }
                                style={headingStyle}
                            />
                        </div>
                        <div className='about-content'>
                            <div className="col">
                                {!imageSelect.url &&
                                    <div className="image-controls">
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(imageSelect)=>{setAttributes({imageSelect})}}
                                                value={imageSelect.id}
                                                render={ ( { open } ) => (
                                                    <Button onClick={ open } className="aleister-strange-mediaupload">Add Image</Button>
                                                ) }
                                            />
                                        </MediaUploadCheck>
                                    </div>
                                }
                                {imageSelect.url &&
                                    <div className="image-controls">
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(imageSelect)=>{setAttributes({imageSelect})}}
                                                value={ imageSelect.id }
                                                render={ ( { open } ) => (
                                                    <Button onClick={ open } className="aleister-strange-mediaupload replace">Replace Image</Button>
                                                ) }
                                            />
                                        </MediaUploadCheck>
                                        <img src={imageSelect.url} alt={imageSelect.alt} width={imageSelect.width} height={imageSelect.height} />
                                    </div>
                                }
                            </div>
                            <div className="col text">
                                <RichText
                                    tagName="p"
                                    value={ description }
                                    onChange={ ( description ) => setAttributes( { description } ) }
                                    placeholder={ __( 'Add Text...' ) }
                                    style={descStyle}
                                />
                            </div>
                        </div>
                        <div className="about-spacer"></div>
                    </div>
                </div>
            </Fragment>
        );
    }
}