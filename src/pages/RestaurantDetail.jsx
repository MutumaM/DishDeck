import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceDetails, getPhotoUrl } from "../api/places";
import Navbar from "../components/Navbar";
import "./RestaurantDetail.css";
import FavoriteButton from "../components/FavoriteButton";


function RestaurantDetail() {
    const { placeId } = useParams()

    const [place, setPlace] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(function () {
        async function loadDetails() {
            try{
                const data = await getPlaceDetails(placeId);
                setPlace(data);
            } catch (err) {
                setError("Couldn't load this restaurant right now")
            } finally {
                setIsLoading(false)
            }
        }

        loadDetails();
    }, [placeId]);

    if (isLoading) return (<div><Navbar /><p>Loading...</p></div>);
    if (error) return (<div><Navbar /><p>{error}</p></div>);
    if (!place) return null;

    const name = place.displayName ? place.displayName.text : "Unnamed";
    const photos = place.photos || [];
    const collagePhotos = photos.slice(0,3);
    const galleryPhotos = photos.slice(3,8);

    const isOpenNow = place.currentOpeningHours ? place.currentOpeningHours.openNow : null;

    return (
        <div className="detail-page">
            <Navbar showSearch={true} />

            {/* Photo collage strip */}
            <div className="detail-collage">
                {collagePhotos.length > 0 ? (
                    collagePhotos.map(function (photo, index) {
                        return (
                            <img
                                key={index}
                                src={getPhotoUrl(photo.name, 700)}
                                alt={name}
                                className="detail-collage-photo"
                            />
                        );
                    })
                ) : (
                    <img src="/hero-dining.jpeg" alt={name} className="detail-collage-photo" />
                )}
            </div>

            <div className="detail-body">
                <div className="detail-title-row">
                    <h1 className="detail-title">{name}</h1>
                    <FavoriteButton placeId={placeId} restaurantName={name} variant="standalone" />
                </div>
                <hr className="detail-divider" />

                <div className="detail-columns">
                    {/* Left: description + dish photo */}
                    <div className="detail-main">
                        <p className="detail-description">
                            {place.formattedAddress}
                            {place.rating && ` · ${place.rating}★ (${place.userRatingCount || 0} reviews)`}
                        </p>

                        {/* {galleryPhotos[0] && (
                            <img
                                src={getPhotoUrl(galleryPhotos[0].name, 600)}
                                alt={`${name} dish`}
                                className="detail-dish-photo"
                            />
                        )} */}
                        <iframe
                            className="detail-map"
                            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&q=place_id:${placeId}`}
                            loading="lazy"
                            allowFullScreen
                            title={`Map showing ${name}`}
                        ></iframe>

                        {place.websiteUri && (
                            <a href={place.websiteUri} target="_blank" rel="noreferrer" className="detail-menu-btn">
                                Visit website
                            </a>
                        )}
                    </div>

                    {/* Right: status card */}
                    <div className="detail-sidebar">
                        <div className="detail-info-card">
                            <p className="detail-open-status">
                                {isOpenNow === true && "🟢 Open now"}
                                {isOpenNow === false && "🔴 Closed"}
                                {isOpenNow === null && "Hours unavailable"}
                            </p>

                            {place.internationalPhoneNumber && (
                                <p className="detail-contact-row">📞 {place.internationalPhoneNumber}</p>
                            )}
                            <p className="detail-contact-row">📍 {place.formattedAddress}</p>
                        </div>

                        {place.currentOpeningHours && (
                            <div className="detail-hours-card">
                                <h3 className="detail-hours-title">Opening Hours</h3>
                                {place.currentOpeningHours.weekdayDescriptions.map(function (line, index) {
                                    return <p key={index} className="detail-hours-row">{line}</p>;
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Gallery strip */}
                {galleryPhotos.length > 0 && (
                    <div className="detail-gallery">
                        {galleryPhotos.map(function (photo, index) {
                            return (
                                <img
                                    key={index}
                                    src={getPhotoUrl(photo.name, 300)}
                                    alt={`${name} gallery ${index}`}
                                    className="detail-gallery-photo"
                                />
                            );
                        })}
                    </div>
                )}

                {/* Reviews */}
                {place.reviews && place.reviews.length > 0 && (
                    <div className="detail-reviews">
                        <h3 className="detail-hours-title">Reviews</h3>
                        {place.reviews.slice(0, 5).map(function (review, index) {
                            return (
                                <div key={index} className="detail-review-item">
                                    <p className="detail-review-author">
                                        {review.authorAttribution ? review.authorAttribution.displayName : "Anonymous"} — {review.rating}★
                                    </p>
                                    <p className="detail-review-text">{review.text ? review.text.text : ""}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RestaurantDetail;