/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment, useState } from '@wordpress/element';
import { ColorPalette, PanelBody, Button, RangeControl, ToggleControl, TextControl, SelectControl, Tooltip, Panel } from '@wordpress/components';
import { InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Export component
 */
export default class heroEdit extends Component {

    componentDidMount() {
        const { attributes } = this.props;
        const { dataArray } = attributes;
        if (0 === dataArray.length) {
            this.initList();
        }
    }

    /**
     * Set up list array
     */
    initList() {
        const { setAttributes, attributes } = this.props;
        const { dataArray } = attributes;
        setAttributes({
            dataArray: [
            {
                index: 0,
                icon: 'dashicons-plus-alt',
                link: '',
            }
            ]
        });
    }

    /**
     * Change item order in array
     * 
     * @param {number} oldIndex 
     * @param {number} newIndex 
     */
    moveItem(oldIndex, newIndex) {
        const { attributes, setAttributes } = this.props;
        const { dataArray } = attributes;

        let arrayCopy = [...dataArray]

        arrayCopy[oldIndex] = dataArray[newIndex]
        arrayCopy[newIndex] = dataArray[oldIndex]

        setAttributes({
            dataArray: arrayCopy
        });
    }

    /**
     * Add new list item
     */
    addNewItem() {
        const { setAttributes, attributes } = this.props;
        const { dataArray } = attributes;
        let attr = {
            index: dataArray.length,
            icon: 'dashicons-plus-alt',
            link: '',
        }
        setAttributes({ 
            dataArray: [...dataArray, attr]
        });
    }

    render() {
        
        const { attributes, setAttributes } = this.props;
        const { 
            heading,
            headingFont,
            headingColorLeft,
            headingColorRight,
            headingFontSize,
            headingFontSizeMobile,
            headingFontWeight,
            headingGap,
            toggleHeadingBgColor,
            headingBgColor,
            headingBgColorOpacity,
            vertPadding,
            paddingLeft,
            paddingRight,
            borderRadius,
            mediaId,
            heroBgDim,
            viewEdit,
            dataArray,
        } = attributes;
        
        // Seperate heading
        var tmp = heading.split(" ");
        if (tmp.length > 1) {
            var headingRight = tmp[tmp.length-1];
            var headingLeft = tmp[0];
        }

        // Convert Hex to RGB
        const convertToRgb = (hex) => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
        }

        // Style objects
        const heroBgImg = {background: 'url('+mediaId+')', backgroundSize: 'cover', boxShadow: 'inset 0 0 0 5000px rgb(0 0 0 / '+heroBgDim+'%)'};
        const rgb = convertToRgb(headingBgColor);

        const headingStyle = {};
        (headingBgColor && toggleHeadingBgColor) && (
            headingStyle.background = 'rgba( '+ rgb.r +', '+ rgb.g +', '+ rgb.b +', '+ headingBgColorOpacity +')'
        );

        vertPadding && (
            headingStyle.paddingTop = vertPadding,
            headingStyle.paddingBottom = vertPadding
        );

        paddingLeft && (
            headingStyle.paddingLeft = paddingLeft,
            headingStyle.paddingRight = paddingRight
        );

        borderRadius && (
            headingStyle.borderRadius = borderRadius
        );

        headingFontWeight && (
            headingStyle.fontWeight = headingFontWeight
        );

        headingFont && (
            headingStyle.fontFamily = headingFont + ', sans-serif'
        );
        
        const headingLeftStyle = {};
        headingColorLeft && (
            headingLeftStyle.color = headingColorLeft,
            headingLeftStyle.fontSize = headingFontSize + 'px'
        );

        const headingRightStyle = {};
        headingColorRight && (
            headingRightStyle.color = headingColorRight,
            headingRightStyle.marginLeft = headingGap + 'px'
        );

        const headingStyleMobile = {};
        headingFontSizeMobile && (
            headingStyleMobile.fontSize = headingFontSizeMobile
        );

        const IconOptions = [
            { label: 'Select icon...', value: 'dashicons-plus-alt' },
            { label: 'Twitter', value: 'dashicons-twitter' },
            { label: 'Facebook', value: 'dashicons-facebook' },
            { label: 'Spotify', value: 'dashicons-spotify' },
            { label: 'SoundCloud', value: 'aleister-soundcloud' },
            { label: 'Instagram', value: 'dashicons-instagram' },
            { label: 'LinkedIn', value: 'dashicons-linkedin' },
            { label: 'YouTube', value: 'dashicons-youtube' },
            { label: 'Email', value: 'dashicons-email' },
        ];

        const SocialLinksRender = dataArray?.map((data, index) => {
            return(
                <Fragment>
                    <div className="item-container">
                        <a className={ data.icon + ' dashicons social-icon' }></a>
                        {viewEdit &&
                            <div className="item-action-wrap">
                            <div className="move-item">
                                {0 < index && (
                                <Tooltip text={__( "Move Left" )}>
                                    <i 
                                        className="dashicons dashicons-arrow-left-alt2" 
                                        onClick={()=>this.moveItem(index, index - 1)}
                                        aria-hidden="true"
                                    ></i>
                                </Tooltip>
                                )}
                                {index + 1 < dataArray.length && (
                                <Tooltip text={__( "Move Right" )}>
                                    <i 
                                        className="dashicons dashicons-arrow-right-alt2" 
                                        onClick={()=>this.moveItem(index, index + 1)}
                                        aria-hidden="true"
                                    ></i>
                                </Tooltip>
                                )}
                            </div>
                            <Tooltip text={__( "Remove Item" )}>
                                <i 
                                    className='dashicons dashicons-no-alt remove-item'
                                    onClick={() => {
                                        let toDelete = confirm('Are you sure you want to delete this item?');
                                        if ( true === toDelete ) {
                                            const updatedArray = dataArray.filter(item => item.index != data.index).map(updatedItems => {
                                                if ( updatedItems.index > data.index ) {
                                                updatedItems.index -= 1
                                                }
                                                return updatedItems
                                            })
                                            setAttributes({dataArray: updatedArray})
                                        }
                                    }}
                                ></i>
                            </Tooltip>
                        </div>
                        }
                        <div className="item-link-wrap">
                            <TextControl
                                value={ data.link }
                                onChange={value => {
                                    let arrayCopy = [...dataArray];
                                    arrayCopy[index].link = value;
                                    setAttributes({ dataArray: arrayCopy });
                                }}
                                placeholder="Enter URL..."
                            />
                        </div>
                        <div className='item-icon-wrap'>
                            <SelectControl
                                value={ data.icon }
                                options={ IconOptions }
                                onChange={value => {
                                    let arrayCopy = [...dataArray];
                                    arrayCopy[index].icon = value;
                                    setAttributes({ dataArray: arrayCopy });
                                }}
                            />
                        </div>
                    </div>
                </Fragment>
            )
        });

        const FontFamily = () => {
            return (
                <SelectControl
                    label="Font"
                    value={ headingFont }
                    options={ [
                        { label: 'Ubuntu', value: 'Ubuntu' },
                        { label: 'Montserrat', value: 'Montserrat' },
                        { label: 'Raleway', value: 'Raleway' },
                    ] }
                    onChange={ ( headingFont ) => setAttributes({ headingFont }) }
                />
            )
        }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__("Heading")} initialOpen={false}>
                        <span className="panel-label">Font</span>
                        <FontFamily />
                        <span className="panel-label">Left Font Color</span>
                        <ColorPalette
                            value={ headingColorLeft }
                            onChange={ ( headingColorLeft ) => setAttributes({headingColorLeft}) }
                        />
                        <span className="panel-label">Right Font Color</span>
                        <ColorPalette
                            value={ headingColorRight }
                            onChange={ ( headingColorRight ) => setAttributes({headingColorRight}) }
                        />
                        <RangeControl
                            label="Font Size"
                            value={ headingFontSize }
                            onChange={ ( headingFontSize ) => setAttributes({ headingFontSize }) }
                            min={ 20 }
                            max={ 100 }
                            className="mt-2"
                        />
                        <RangeControl
                            label="Mobile Font Size"
                            value={ headingFontSizeMobile }
                            onChange={ ( headingFontSizeMobile ) => setAttributes({ headingFontSizeMobile }) }
                            min={ 20 }
                            max={ 80 }
                        />
                        <RangeControl
                            label="Word Gap"
                            value={ headingGap }
                            onChange={ ( headingGap ) => setAttributes({ headingGap }) }
                            min={ 0 }
                            max={ 80 }
                        />
                        <RangeControl
                            label="Font Weight"
                            value={ headingFontWeight }
                            onChange={ ( headingFontWeight ) => setAttributes({ headingFontWeight }) }
                            min={ 100 }
                            max={ 900 }
                            step={ 100 }
                        />
                    </PanelBody>
                    <PanelBody title={__("Heading Background")} initialOpen={false}>
                        <ToggleControl
                            label="Heading Background"
                            help={
                                toggleHeadingBgColor
                                    ? 'Background Color Enabled.'
                                    : 'Background Color Disabled.'
                            }
                            checked={ toggleHeadingBgColor }
                            onChange={ ( toggleHeadingBgColor ) => setAttributes({toggleHeadingBgColor}) }
                            className="mt-2"
                        />
                        {toggleHeadingBgColor &&
                            <Fragment>
                                <span className="panel-label">Heading Background Color</span>
                                <ColorPalette
                                    value={ headingBgColor }
                                    onChange={ ( headingBgColor ) => setAttributes({headingBgColor}) }
                                />
                                <RangeControl
                                    label="Background Color Opacity"
                                    value={ headingBgColorOpacity }
                                    onChange={ ( headingBgColorOpacity ) => setAttributes({ headingBgColorOpacity }) }
                                    min={ 0 }
                                    max={ 1 }
                                    step={ .1 }
                                    className='mt-2'
                                />
                                <RangeControl
                                    label="Vertical Padding"
                                    value={ vertPadding }
                                    onChange={ ( vertPadding ) => setAttributes({ vertPadding }) }
                                    min={ 0 }
                                    max={ 100 }
                                    className='mt-2'
                                />
                                <RangeControl
                                    label="Left Horizontal Padding"
                                    value={ paddingLeft }
                                    onChange={ ( paddingLeft ) => setAttributes({ paddingLeft }) }
                                    min={ 0 }
                                    max={ 100 }
                                />
                                <RangeControl
                                    label="Right Horizontal Padding"
                                    value={ paddingRight }
                                    onChange={ ( paddingRight ) => setAttributes({ paddingRight }) }
                                    min={ 0 }
                                    max={ 100 }
                                />
                                <RangeControl
                                    label="Corner Roundness"
                                    value={ borderRadius }
                                    onChange={ ( borderRadius ) => setAttributes({ borderRadius }) }
                                    min={ 0 }
                                    max={ 150 }
                                />
                            </Fragment>
                        }
                    </PanelBody>
                    <PanelBody title={__("Background Image")} initialOpen={false}>
                        <span className="panel-label">Background Image</span>
                            {!mediaId &&
                                <div className="image-controls" style={{padding: '100px'}}>
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={ ( media ) =>
                                                setAttributes({ mediaId: media.url })
                                            }
                                            value={ mediaId }
                                            render={ ( { open } ) => (
                                                <Button onClick={ open } className="aleister-strange-mediaupload">Open Media Library</Button>
                                            ) }
                                        />
                                    </MediaUploadCheck>
                                </div>
                            }
                            {mediaId &&
                                <div className="image-controls">
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={ ( media ) =>
                                                setAttributes({ mediaId: media.url })
                                            }
                                            value={ mediaId }
                                            render={ ( { open } ) => (
                                                <Button onClick={ open } className="aleister-strange-mediaupload replace">Open Media Library</Button>
                                            ) }
                                        />
                                    </MediaUploadCheck>
                                    <img src={mediaId} alt="image-preview"></img>
                                </div>
                            }
                        <RangeControl
                            label="Background Dim"
                            value={ heroBgDim }
                            onChange={ ( heroBgDim ) => setAttributes({ heroBgDim }) }
                            min={ 0 }
                            max={ 100 }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="hero-block" style={heroBgImg}>
                    <div className='heading-container'>
                        <ToggleControl
                            label="Edit Mode"
                            help={
                                viewEdit
                                    ? 'Edit Mode.'
                                    : 'Preview Mode.'
                            }
                            checked={ viewEdit }
                            onChange={ ( viewEdit ) => setAttributes({viewEdit}) }
                            className="edit-toggle"
                        />
                        {!viewEdit && // Preview Mode
                            <Fragment>
                                <h1 className="heading" style={{ ...headingLeftStyle, ...headingStyle }}>
                                    {headingLeft}
                                    <span style={headingRightStyle}>{headingRight}</span>
                                </h1>
                                <h1 className="heading-mobile" style={{ ...headingLeftStyle, ...headingStyle, ...headingStyleMobile }}>
                                    {heading}
                                </h1>
                            </Fragment>
                        }
                        {viewEdit && // Edit Mode
                            <RichText
                                tagName="h1"
                                value={ heading }
                                onChange={ ( heading ) => setAttributes( { heading } ) }
                                placeholder={ __( 'Heading...' ) }
                                style={{ ...headingLeftStyle, ...headingStyle }}
                                id="heading"
                            />
                        }
                    </div>
                    <div className="social-links">
                        {SocialLinksRender}
                        <i
                            className="dashicons dashicons-plus-alt2 add-item"
                            aria-hidden="true"
                            onClick={() => {
                                this.addNewItem();
                            }}
                        ></i>
                    </div>
                </div>
            </Fragment>
        );
    }
}