"use client";

import React,{useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import './Exhibits.css';
import { motion } from "motion/react";

export function ExhibitsPage() {
        //initialize an array containing artifacts got from the backend
    const [artifacts,setArtifacts] =useState([]);
    //This array stores the artifact data based on story
    const [selectedStory,setSelectedStory] = useState(null);
    const router = useRouter();

    //This is to fetch artifact data from the backend
    useEffect(()=>{
        fetch('/api/artifacts')
        .then(res => res.json())
        .then(data => setArtifacts(data))
        .catch(err => console.error('Error fetching artifacts:',err))
    },[]);

    //This function is for the selected story
    const handleStorySelect = (storyTag) => {
        setSelectedStory(storyTag);
    };
    
    //This is a function which creates story cards
    const renderStorySelector = () => (
      //This is div contains all the story cards
  <div>
    <div className="storyGrid">
      <motion.div
        className="storyCard"
        onClick={() => handleStorySelect('bluenose')}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
      >
        <img src='/img/Bluenose_II.jpg' alt="Bluenose" />
        <div className="storyCardBody">
          <h5>Bluenose</h5>
          <p>The original Bluenose was launched as a Grand Banks fishing and racing
             schooner on 26 March 1921 in Lunenburg, Nova Scotia. It was designed by William
             Roué and built by the Smith and Rhuland Shipyard.</p>
        </div>
      </motion.div>

      <motion.div
        className="storyCard"
        onClick={() => handleStorySelect('prison')}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
      >
        <img src="/img/melville-prison.jpg" alt="Melville Prison" />
        <div className="storyCardBody">
          <h5>Melville Prison</h5>
          <p>Melville Island and Deadman's Island National Historic Site of Canada is
            located on the south shore near the head of Northwest Arm, Halifax, Nova Scotia.
            Deadman's Island is a small, treed park with no buildings. Melville Island features
            a yacht club with a club house in landscaped grounds, out-buildings, and wharves.
            Both islands are small peninsulas connected to the mainland. Melville Island was
            the site of prisoner of war camps during the Napoleonic Wars, the War of 1812, and
            the First World War.</p>
        </div>
      </motion.div>

      <motion.div
        className="storyCard"
        onClick={() => handleStorySelect('coming soon')}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
      >
        <img src="/img/coming soon.jpg" alt="Coming Soon" />
        <div className="storyCardBody">
          <h5>Coming Soon</h5>
          <p>A third exhibit story is in development.</p>
        </div>
      </motion.div>
    </div>
  </div>
);
//This method renders artifact
      const renderArtifacts = () => {
        //If there is no selected story
          if(!selectedStory){
              return null;
          }
          const filtered = artifacts
          .filter(a =>
            Array.isArray(a.tags) &&
            a.tags.map(tag => tag.toLowerCase()).includes(selectedStory.toLowerCase())
          )
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
       if(filtered.length == 0){
          return(
            <div className='artifactGrid'>
              <div className='artifactNotFound'>
                <p>No artifact(s) found for this story.</p>
              </div>
            </div>
          );
        }
      return (
        <div className="artifactGrid">
          {filtered.map(artifact => (
            <div
              className="artifactCard"
              key={artifact.id}
              onClick={() => router.push(`/gallery/${artifact.id}`)}
            >
              <img
                src={
                  artifact.images?.length > 0
                    ? (artifact.images[0].startsWith('http')
                        ? artifact.images[0]
                        : `https://gggkhfcrgvelcoobqmyg.supabase.co/storage/v1/object/public/uploads/${artifact.images[0]}`)
                    : 'https://via.placeholder.com/300x200?text=No+Image'
                }
                alt={artifact.artifact_title}
              />

              <div className="artifactCardBody">
                <h5>{artifact.artifact_title}</h5>
                <p>{artifact.description}</p>
                <p><small>Year: {artifact.year}</small></p>
              </div>
            </div>
          ))}
        </div>
      );
    };
  //This is to render the UI of the page
  return (
    <motion.div
      className="exhibits-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="exhibits-header">
          <h1 className="exhibits-title">Explore Exhibits</h1>
          <p className="exhibits-subtitle">
              Delve into the history of AYC's artifacts through our exclusive exhibits.
          </p>
      </div>
      <div>
            {renderStorySelector()}
      </div>
      
      {renderArtifacts()}
    </motion.div>
  );
}
