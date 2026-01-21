"use client";

import React from 'react'
import { DotButton, useDotButton } from './CarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

const Carousel = (props) => {
  const { artifacts, options, onArtifactClick } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {artifacts.map((artifact, index) => {
            const firstImage = artifact.images?.[0];
            const imageUrl = firstImage?.startsWith('http')
              ? firstImage
              : firstImage
              ? `https://gggkhfcrgvelcoobqmyg.supabase.co/storage/v1/object/public/uploads/${firstImage}`
              : null;

            return (
              <div className="embla__slide" key={artifact.id || index}>
                <div
                  className="embla__slide__content"
                  onClick={() => onArtifactClick(artifact)}
                >
                  {imageUrl ? (
                    <img
                      className="embla__slide__img"
                      src={imageUrl}
                      alt={artifact.artifact_title}
                    />
                  ) : (
                    <div className="embla__slide__placeholder">
                      No image available
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel
