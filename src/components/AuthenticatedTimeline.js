import React, { useState, useEffect } from "react";
import useSiteMetadata from "../hooks/SiteMetadata";
import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";
import TimeAgo from "react-timeago";
import userRssData from "../../static/data/userRss.json";
import Menu from "../components/menu";
import useNetlifyIdentity from '../components/useNetlifyIdentity';


const AuthenticatedTimeline = () => {
  const { showNav } = useSiteMetadata();
  const { showDates } = useSiteMetadata();
  const { postcount } = useSiteMetadata();
  const [feed, setFeed] = useState([]);
  const [visibleItems, setVisibleItems] = useState(postcount);
  const [favorites, setFavorites] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [newFeedName, setNewFeedName] = useState("");


  const showMoreItems = () => {
    setVisibleItems(visibleItems + postcount);
    };
    

  const [loggedIn, setLoggedIn] = useState(false);
  useNetlifyIdentity(setLoggedIn);

  const combinedFeed = [
    ...favorites,
    ...feed.filter((item) => !favorites.some((fav) => fav.link === item.link)),
  ];

  // filter out favorited items from combinedFeed
  const filteredFeed = combinedFeed.filter((item) => !item.favorite);

  useEffect(() => {
    const fetchRssFeed = async (rssFeed) => {
      try {
        const response = await fetch(rssFeed.rssFeedUrl);
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, "text/xml");
        const items = xml.querySelectorAll("item");

        return Array.from(items).map((item) => {
          const mediaContent = item.getElementsByTagName("media:content")[0];
          const imageUrl = mediaContent ? mediaContent.getAttribute("url") : null;

          return {
            name: rssFeed.name,
            title: item.querySelector("title")?.textContent || "",
            link: item.querySelector("link")?.textContent || "",
            description: item.querySelector("description")?.textContent || "",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            imageUrl: imageUrl,
            favorite: false, // Add the favorite field and set it to false by default
          };
        });
      } catch (error) {
        console.error(`Failed to fetch RSS feed from ${rssFeed.rssFeedUrl}:`, error);
        return [];
      }
    };

    const fetchAllFeeds = async () => {
      if (typeof window !== "undefined") {
        const feedPromises = [...userRssData.rssFeeds, ...userSubscriptions].map((feed) => fetchRssFeed(feed));
        const allFeeds = await Promise.all(feedPromises);
        const mergedFeed = [].concat(...allFeeds);
  
        // Sort the merged feeds by their pubDate in descending order (most recent first)
        const sortedFeed = mergedFeed.sort((a, b) => {
          return new Date(b.pubDate) - new Date(a.pubDate);
        });
  
        setFeed(sortedFeed);
      }
    };
  
    fetchAllFeeds();
  }, [userSubscriptions]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedSubscriptions = localStorage.getItem("userSubscriptions");
    if (storedSubscriptions) {
      setUserSubscriptions(JSON.parse(storedSubscriptions));
    }
  }, []);

  const toggleFavorite = (item) => {
    const newFavorites = [...favorites];

    if (favorites.some((favorite) => favorite.link === item.link)) {
      // If the item is already in favorites, remove it
      const index = newFavorites.findIndex((favorite) => favorite.link === item.link);
      newFavorites.splice(index, 1);
      item.favorite = false;
    } else {
      // Otherwise, add the item to favorites
      newFavorites.push(item);
      item.favorite = true;
    }
    
    setFavorites(newFavorites);
    
    // Save the new favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    
    // Update the favorite status of the item in the feed
    const newFeed = feed.map((feedItem) => {
      if (feedItem.link === item.link) {
        return { ...feedItem, favorite: item.favorite };
      }
      return feedItem;
    });
    
    setFeed(newFeed);

  };

  const createExcerpt = (html, maxLength) => {
    const strippedText = new DOMParser().parseFromString(html, 'text/html').body.textContent;
    return strippedText.length > maxLength ? `${strippedText.slice(0, maxLength)}...` : strippedText;
  };
  
  
  const addSubscription = () => {
    if (newFeedUrl && newFeedName) {
      const newSubscription = {
        rssFeedUrl: newFeedUrl,
        name: newFeedName,
      };
      const updatedSubscriptions = [...userSubscriptions, newSubscription];
      setUserSubscriptions(updatedSubscriptions);
      localStorage.setItem("userSubscriptions", JSON.stringify(updatedSubscriptions));
  
      setNewFeedUrl("");
      setNewFeedName("");
    }
  };
  



return (
<Layout>
<Helmet>
<body id="body" className="social" />
</Helmet>
{showNav ? (
    <div className="spacer" style={{ height: "70px", border: "0px solid yellow" }}></div>
  ) : (
    ""
  )}



    <div className="post-card controlpanel sidebarMenuInner" style={{ display: 'flex', flexDirection: 'column', height: '', minWidth: '', position: 'fixed', alignItems: 'center', justifyContent: 'center', margin: '2% auto 0 auto', zIndex: '2', borderRadius: '0 8px 0 0', border: '0px solid', borderRight: '1px 1px 0 0 solid #888' }}>

      <div style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', position: 'absolute', top: '', right: '5px', letterSpacing: '2px', fontSize: 'clamp(1.2rem,2.2vw,1.8rem)' }}><h3>Profile</h3></div>

      {/* {loggedIn ? (
        <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}><Menu /></ul>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}><Menu /></ul>
      )} */}

      <div className="contact-form" style={{display:'flex', flexDirection:'column'}}>
        <input
          type="text"
          placeholder="Feed name"
          value={newFeedName}
          onChange={(e) => setNewFeedName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Feed URL"
          value={newFeedUrl}
          onChange={(e) => setNewFeedUrl(e.target.value)}
/>
<button className="button" onClick={addSubscription}>Add Subscription</button>
</div>
         
<div>
        <h4>Subscriptions</h4>
        <ul>
          {userSubscriptions.map((subscription, index) => (
            <li key={index}>{subscription.name}</li>
          ))}
        </ul>
      </div>
    </div>


  {/* <div className="contentpanel grid-container" style={{ marginTop: "1rem" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>

      {favorites.map((item, index) => (
        <div className="post-card" key={index}>
          <div className="post-header">
            <h3 className="post-title">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h3>
            <button onClick={() => toggleFavorite(item)}>
              {item.favorite ? "Unfavorite" : "Favorite"}
            </button>
          </div>
          <div className="post-meta">
            <span className="post-source">{item.name}</span>
            {showDates && <TimeAgo date={item.pubDate} />}
          </div>
          <div className="post-content">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="post-image" />
            )}
            <p className="post-excerpt">{createExcerpt(item.description, 150)}</p>
          </div>
        </div>
      ))}
    </div> */}

<div className="contentpanel grid-container" style={{ marginTop: "" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>



      {filteredFeed.slice(0, visibleItems).map((item, index) => (

<div className="post-card1" key={index} style={{ justifyContent: "center", alignItems: "center" }}>
          
      
  <a className="postlink" href={item.link} rel="noopener noreferrer">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="featured-image1" />
            )}
    <div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'start', width:'100%', height:'', position:'relative', background:'', padding:'0 1vw', margin:'2vh auto 0 auto', textAlign:'', overFlow:'hidden'}}>
            <h3 className="post-title">{item.title}</h3>
           

            <p className="post-excerpt">{createExcerpt(item.description, 150)}</p> 
    </div>
 </a>


        <div className="post-meta" style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'0 auto', width:'auto', maxWidth:'80vw', margin:'0 auto', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)', gap:'2vw', background:'rgba(0, 0, 0, 0.7)',}}>
             <h4 className="post-source" style={{textAlign:'center'}}>{item.name}</h4>
            {showDates && <TimeAgo date={item.pubDate} />}
        </div>

          <button onClick={() => toggleFavorite(item)} style={{position:''}}>
              {item.favorite ? "Unfavorite" : "☆"}
          </button>
<br />

</div>

      ))}

{visibleItems < filteredFeed.length && (
  <div className="load-more-wrapper" style={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'', width:'', height:''}}>
  <button className="button load-more" onClick={showMoreItems}>
    Load more
  </button>
  </div>
      )}

    </div>

</Layout>

);
};

export default AuthenticatedTimeline;