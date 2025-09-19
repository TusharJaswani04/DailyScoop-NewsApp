import React, { useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon
} from 'react-share'

const ShareButton = ({ article }) => {
  const [showShare, setShowShare] = useState(false)
  const shareUrl = article.link || window.location.href
  const shareTitle = article.title
  const shareText = `${article.title} - ${article.summary}`

  return (
    <div className="position-relative">
      <button 
        className="btn btn-outline-secondary btn-sm"
        onClick={() => setShowShare(!showShare)}
      >
        <i className="fas fa-share-alt"></i>
      </button>
      
      {showShare && (
        <div className="position-absolute bottom-100 end-0 mb-2 p-3 bg-white border rounded shadow-lg share-popup">
          <div className="d-flex gap-2">
            <WhatsappShareButton url={shareUrl} title={shareText}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            
            <FacebookShareButton url={shareUrl} quote={shareText}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            
            <TwitterShareButton url={shareUrl} title={shareText}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            
            <LinkedinShareButton url={shareUrl} title={shareTitle} summary={article.summary}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
          
          <button 
            className="btn btn-sm btn-link text-decoration-none mt-2 w-100"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl)
              alert('Link copied to clipboard!')
            }}
          >
            <i className="fas fa-copy me-1"></i>
            Copy Link
          </button>
        </div>
      )}
    </div>
  )
}

export default ShareButton