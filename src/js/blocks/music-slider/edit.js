/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { ColorPalette, PanelBody, TextControl, Tooltip } from '@wordpress/components';
import { InspectorControls, RichText } from '@wordpress/block-editor';

import {
	sortableContainer,
	sortableElement,
	sortableHandle,
	arrayMove,
} from 'react-sortable-hoc';

const DragHandle = sortableHandle( () => (
	<Tooltip text={ __( 'Hold & Drag to Reorder' ) }>
		<span className="dashicons dashicons-move"></span>
	</Tooltip>
) );

const SortableItem = sortableElement( ( { value } ) => (
	<div id={ value.id } className="slider-sort__item">
		<DragHandle />
        {value.embedCode &&
            <div dangerouslySetInnerHTML={{__html: value.embedCode}}></div>
        }
        {!value.embedCode &&
            <div className="slider-sort__item-no-data">
                <p>No Embed</p>
            </div>
        }
	</div>
) );

const SortableContainer = sortableContainer( ( { children } ) => {
	return <div className="slider-sort__wrap">{ children }</div>;
} );

/**
 * Export component
 */
export default class musicEdit extends Component {

    constructor( props ) {
		super( props );
		this.state = {
			slickSliderObj: {},
		};
		this.initSlider = this.initSlider.bind( this );
        this.onSortEnd = this.onSortEnd.bind( this );
	}

    onSortEnd( { oldIndex, newIndex } ) {
		const { setAttributes, attributes } = this.props;
        const { sliderArray } = attributes;
		const sortedData = arrayMove(
			sliderArray,
			oldIndex,
			newIndex
		);

		this.reloadSlider();
        setAttributes({ sliderArray: sortedData })
		this.initSlider();
	}

    componentDidMount() {
		const { attributes, setAttributes } = this.props;
		const { sliderArray } = attributes;

		if ( sliderArray.length ) {
            if ( 0 === sliderArray.length ) {
                setTimeout( () => this.initSlider(), 200 );
            } else {
                setTimeout( () => this.initSlider(), 200 );
            }
		}

        if ( ! sliderArray.length ) {

            let attr = {
                id: 'slider-item-' + sliderArray.length,
                embedCode: '',
                embedImg: '',
            }

            let newSliderData = [ attr,  ...sliderArray ]

            setAttributes( { sliderArray: newSliderData } );
            setTimeout( () => this.initSlider(), 200 )
        }
	}

    componentDidUpdate( prevProps ) {
		const { attributes } = this.props;
		const { sliderArray } = attributes;
		const { sliderArray: prevItems } = prevProps.attributes;

		if ( sliderArray.length !== prevItems.length ) {
			if ( 0 === prevItems.length ) {
				setTimeout( () => this.initSlider(), 10 );
			} else {
				this.initSlider();
			}
		}
	}

    initSlider(index) {
		const { attributes } = this.props;
		const { blockID } = attributes;
		const sliderObj = jQuery(
			'#' + blockID + ' .music__slider-inner'
		).slick( {
			autoplay: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			adaptiveHeight: false,
            initialSlide: index,
		} );
		this.setState( { slickSliderObj: sliderObj } );
        jQuery('#' + blockID + ' .music__slider-inner').eq(0).addClass('active').siblings().removeClass('active');
        sliderObj.on("beforeChange", function (event, slick, currentSlide, nextSlide){
            jQuery('#' + blockID + ' .music__slider-inner').eq(nextSlide).addClass('active').siblings().removeClass('active');
        });
	}

    reloadSlider() {
		const { attributes } = this.props;
		const { blockID } = attributes;
		let slider = jQuery('#' + blockID + ' .music__slider-inner');
        if (slider.hasClass('slick-initialized')) {
            slider.slick('unslick');
        }
	}

    addItem() {
		const { setAttributes, attributes } = this.props;
        const { sliderArray, blockID } = attributes;

        let attr = {
            id: 'slider-item-' + sliderArray.length,
            embedCode: '',
            embedImg: '',
        }

        let newItems = [ attr, ...sliderArray ];

		this.reloadSlider();

		setAttributes( { sliderArray: newItems } );

	}

    render() {
        const { attributes, setAttributes, clientId } = this.props;
        const { 
            heading,
            headingColor,
            backgroundColor1,
            backgroundColor2,
            sliderArray,
            blockID,
        } = attributes;

        if ( ! blockID ) {
			setAttributes( { blockID: `music-slider-${ clientId }` } );
		}

        const headingStyle = {};
        headingColor && (
            headingStyle.color = headingColor
        );

        const backgroundStyle = {};
        backgroundColor1 && (
            backgroundStyle.background = 'linear-gradient(180deg, '+backgroundColor1+', '+backgroundColor2+')'
        );

        function sanitizeLink(e) {
            let result = e.replace(/style="[^"]*"/, "");
            result = result.replace(/<div.*$/, "");
            result = result.replace(/(height|width)="[\d]+"/gi, '');
            console.log(result);
            return result;
        }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__("Color Settings")} initialOpen={false}>
                        <span className="panel-label">Heading Color</span>
                        <ColorPalette
                            value={ headingColor }
                            onChange={ ( headingColor ) => setAttributes({headingColor}) }
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
                <div className="music-slider-block" style={backgroundStyle} id={blockID}>
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
                        <div className="music__slider">
                            <div className="music__slider-inner">
                                {sliderArray.map(( item, index ) => 
                                    <div
                                        className="music-slider__item"
                                        key={
                                            'music-slider__item-' +
                                            item.id
                                        }
                                    >
                                        <Tooltip
                                            text={ __(
                                                'Remove Item'
                                            ) }
                                        >
                                            <span
                                                className="dashicon dashicons dashicons-no-alt remove-item"
                                                onClick={ () => {
                                                    let toDelete = confirm(__('Are you sure you want to delete this item?', 'aleister-prime'));
                                                    if ( true === toDelete ) {
                                                        const arrayCopy = [...sliderArray];
                                                        arrayCopy.splice(index, 1);
                                                        this.reloadSlider();
                                                        setAttributes({ sliderArray: arrayCopy});
                                                    }
                                                } }
                                                icon="remove"
                                            ></span>
                                        </Tooltip>
                                        {item.embedCode &&
                                            <>
                                                <TextControl
                                                    value={ item.embedCode }
                                                    placeholder="Enter Embed Code..."
                                                    onChange={embed => {
                                                        let sanitizedEmbed = sanitizeLink(embed);
                                                        let arrayCopy = [...sliderArray];
                                                        arrayCopy[index].embedCode = sanitizedEmbed;
                                                        setAttributes({ sliderArray: arrayCopy });
                                                    }}
                                                />
                                                <div className="col" dangerouslySetInnerHTML={{__html: item.embedCode}}></div>
                                            </>
                                        }
                                        {!item.embedCode &&
                                            <>
                                                <TextControl
                                                    value={ item.embedCode }
                                                    placeholder="Enter Embed Code..."
                                                    onChange={embed => {
                                                        let sanitizedEmbed = sanitizeLink(embed)
                                                        let arrayCopy = [...sliderArray];
                                                        arrayCopy[index].embedCode = sanitizedEmbed;
                                                        setAttributes({ sliderArray: arrayCopy });
                                                    }}
                                                />
                                                <div className="col no-data"></div>
                                            </>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="slider-sort">
                        {
                            <SortableContainer
                                items={ sliderArray }
                                onSortEnd={ this.onSortEnd }
                                axis={ 'xy' }
                            >
                                <div className="slider-sort__item-wrap add-item-wrap">
                                    <Tooltip text={__( "Add New Item" )}>
                                        <i
                                            className="dashicons dashicons-plus-alt2 add-new-item"
                                            aria-hidden="true"
                                            onClick={() => { this.addItem(); }}
                                        ></i>
                                    </Tooltip>
                                </div>
                                { sliderArray.map(
                                    ( item, sliderIndex ) => (
                                        <div
                                            key={
                                                'slider-sort__item-wrap-' +
                                                sliderIndex
                                            }
                                            id={sliderIndex}
                                            className={'slider-sort__item-wrap' + (sliderIndex === 0 ? ' active' : '') }
                                            onClick={ () => {
                                                jQuery('#' + blockID + ' .music__slider-inner').slick('slickGoTo', sliderIndex);
                                                jQuery('#' + sliderIndex).addClass('active').siblings().removeClass('active');
                                            }}
                                        >
                                            <SortableItem
                                                key={
                                                    item.id
                                                }
                                                index={
                                                    sliderIndex
                                                }
                                                value={ item }
                                            />
                                            <div className="image-controls">
                                                <Tooltip
                                                    text={ __(
                                                        'Remove Item'
                                                    ) }
                                                >
                                                    <span
                                                        className="dashicon dashicons dashicons-no-alt remove-image"
                                                        onClick={ () => {
                                                            let toDelete = confirm(__('Are you sure you want to delete this item?', 'cottages-gardens'));
                                                            if ( true === toDelete ) {
                                                                const arrayCopy = [...sliderArray];
                                                                arrayCopy.splice(sliderIndex, 1);
                                                                this.reloadSlider();
                                                                setAttributes({ sliderArray: arrayCopy});
                                                            }
                                                        } }
                                                        icon="remove"
                                                    ></span>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    )
                                ) }
                            </SortableContainer>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}