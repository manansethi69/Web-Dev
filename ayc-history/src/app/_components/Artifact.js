"use client";

// Artifact component displays a detailed view of a single artifact, including images, description, and map location.
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './Artifact.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as Shareon from "shareon";
import "shareon/css";

function Artifact({ artifact }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCaption, setSelectedCaption] = useState('');
    const [mapModalOpen, setMapModalOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const fromMap = searchParams.get('fromMap') === 'true';

    const handleClose = () => {
        if (fromMap) {
            router.push('/map');
        } else {
            artifact.onClose?.();
        }
    };

    // Set default Leaflet marker icon to custom pin image
    const customIcon = L.icon({
        iconUrl: '/img/pin.png',
        iconSize: [25, 40],
        iconAnchor: [19, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
    });
    L.Marker.prototype.options.icon = customIcon;

    // Subcomponent to recenter the map when coordinates change
    function RecenterMap({ lat, lng }) {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng]);
        }, [lat, lng, map]);
        return null;
    }

    // Fetch caption when modal opens with selectedImage
    useEffect(() => {
        if (modalOpen && selectedImage) {
            const fetchCaption = async () => {
                try {
                    const res = await fetch(`/api/photo-caption?path=${encodeURIComponent(selectedImage)}`);
                    const data = await res.json();
                    setSelectedCaption(data.caption || '');
                } catch (err) {
                    console.error("Failed to fetch caption:", err);
                    setSelectedCaption('');
                }
            };

            fetchCaption();
        }
    }, [modalOpen, selectedImage]);

    useEffect(() => {
        Shareon.init();
    }, []);

    const handleMapCreated = (map) => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100); // wait for modal to open
    };

    // Modal for opening images in fullscreen
    const getFullImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `https://gggkhfcrgvelcoobqmyg.supabase.co/storage/v1/object/public/uploads/${path}`;
    };

    const imageModal = modalOpen && (
        <div className="fullscreen-modal" onClick={() => setModalOpen(false)}>
            <img
                src={getFullImageUrl(selectedImage)}
                alt={selectedCaption}
                className="fullscreen-image"
                // Prevent closing modal on image click
                onClick={e => e.stopPropagation()}
            />
            <div className="fullscreen-caption-overlay">
                {selectedCaption}
            </div>
            <button className="modal-close-button" onClick={() => setModalOpen(false)}>×</button>
        </div>
    );

    return (
        // Main container for artifact
        <div className="artifact-modal">
            {/* Close button */}
            <button className="close-button" onClick={handleClose}>×</button>
            {/* Layout wrapper */}
            <div className="artifact-layout">
                {/* Artifact title */}
                <div className="artifact-header">
                    <h2>{artifact.artifact_title}</h2>
                </div>

                {/* Image carousel */}
                <div className="artifact-carousel">
                    <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                        {(artifact.images || artifact.photos?.split(",") || []).map((img, i) => {
                            const imagePath = typeof img === 'string' ? img.trim() : img;
                            const imageUrl = getFullImageUrl(imagePath);
                            return (
                                <div key={i} className="carousel-image-wrapper" onClick={e => {
                                    e.stopPropagation();
                                    setSelectedImage(imagePath);
                                    setModalOpen(true);
                                }}>
                                    <img
                                        src={imageUrl}
                                        alt={artifact.artifact_title}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                </div>

                {/* Artifact info layout (description and map) */}
                <div className="artifact-info-container">
                    <div className="artifact-meta">
                        <div className="artifact-description artifact-info-text">
                            <p className="artifact-year">{artifact.year}</p>
                            <p className="artifact-description">{artifact.description}</p>
                            <p><strong>Storage Location:</strong> {artifact.storage_location}</p>
                        </div>

                        {/* Map display with marker at artifact location */}
                        <div className="artifact-map-container" onClick={() => setMapModalOpen(true)}>
                            <MapContainer center={[artifact.latitude, artifact.longitude]} zoom={13} className="artifact-map">
                                <TileLayer
                                    attribution='Tiles &copy; Esri'
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                                />
                                <Marker position={[artifact.latitude, artifact.longitude]} icon={customIcon}>
                                    <Popup>{artifact.artifact_title}</Popup>
                                </Marker>
                                <RecenterMap lat={artifact.latitude} lng={artifact.longitude} />
                            </MapContainer>
                        </div>
                    </div>

                    {/* Shareon Buttons */}
                    <div className="shareon" data-url={`${artifact.shareUrl}`}>
                        <button className="facebook">Facebook</button>
                        <button className="twitter">Twitter</button>
                        <button className="linkedin">LinkedIn</button>
                        <button className="email">Email</button>
                        <button className="copy-url">Copy Link</button>
                    </div>
                </div>
            </div>
            {imageModal}
            {mapModalOpen && (
                <div className="fullscreen-modal" onClick={() => setMapModalOpen(false)}>
                    <div className="fullscreen-map" onClick={e => e.stopPropagation()}>
                        <MapContainer
                            center={[artifact.latitude, artifact.longitude]}
                            zoom={15}
                            className="fullscreen-map-container"
                            whenCreated={handleMapCreated}
                        >
                            <TileLayer
                                attribution='Tiles &copy; Esri'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                            />
                            <Marker
                                position={[artifact.latitude, artifact.longitude]}
                                icon={customIcon}
                            >
                                <Popup>{artifact.artifact_title}</Popup>
                            </Marker>
                        </MapContainer>
                        <button className="modal-close-button" onClick={() => setMapModalOpen(false)}>×</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Artifact;
