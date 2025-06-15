export const parseLinkedInUrl = (url) => {
  // Basic LinkedIn URL validation
  const linkedinRegex = /linkedin\.com\/(posts|pulse|in)\//;
  
  if (!linkedinRegex.test(url)) {
    throw new Error('Invalid LinkedIn URL');
  }

  // Extract post ID, author, and topic from URL
  const segments = url.split('/');
  const postIndex = segments.findIndex(segment => segment === 'posts');
  
  if (postIndex !== -1 && segments[postIndex + 1]) {
    const postSegment = segments[postIndex + 1];
    
    // Extract author name and topic from the post segment
    // Pattern: authorname_topic-activity-randomstring
    const parts = postSegment.split('_');
    
    let authorName = 'LinkedIn User';
    let topic = '';
    let postId = postSegment;
    
    if (parts.length >= 2) {
      // Extract author name (first part)
      authorName = parts[0]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Extract topic (everything between first _ and -activity)
      const topicPart = parts.slice(1).join('_');
      const activityIndex = topicPart.indexOf('-activity');
      
      if (activityIndex !== -1) {
        topic = topicPart.substring(0, activityIndex)
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }
    
    // Create a readable title
    const title = topic ? `${topic} - LinkedIn Post` : 'LinkedIn Post';
    
    return {
      type: 'post',
      id: postId,
      title: title,
      author: authorName,
      topic: topic,
      preview: topic ? `Post about ${topic.toLowerCase()}` : 'LinkedIn post content...',
      url: url
    };
  }

  return {
    type: 'unknown',
    title: 'LinkedIn Content',
    author: 'LinkedIn User',
    topic: '',
    preview: 'LinkedIn content...',
    url: url
  };
};

// Helper function to clean and format names/topics
// const formatText = (text) => {
//   return text
//     .split('-')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };
