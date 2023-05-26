/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

/**
 * Export component
 */
export default class musicSave extends Component {

	render() {
		const { attributes, className } = this.props;
        const {
            heading,
            headingColor,
            backgroundColor1,
            backgroundColor2,
            sliderArray,
            blockID,
        } = attributes;

        const headingStyle = {};
        headingColor && (
            headingStyle.color = headingColor
        );

        const backgroundStyle = {};
        backgroundColor1 && (
            backgroundStyle.background = 'linear-gradient(180deg, '+backgroundColor1+', '+backgroundColor2+')'
        );

        return (
            <div className="music-slider-block" style={backgroundStyle}>
                <div className="container">
                    <div className='heading-wrap'>
                        <RichText.Content
                            tagName="h2"
                            value={ heading }
                            style={headingStyle}
                        />
                    </div>
                    <div className="music__slider">
                        <div className="music__slider-inner">
                            {sliderArray.map(( item ) =>
                                <div
                                    className="music-slider__item"
                                    key={
                                        'music-slider__item-' +
                                        item.id
                                    }
                                >
                                    <div className="col" dangerouslySetInnerHTML={{__html: item.embedCode}}></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
	}
}
