import { useEffect, useState } from 'react';
import { Typography, Container, CircularProgress } from '@mui/material';
import UserCard from '../components/UserCard';
import { fetchUsers, fetchPosts, fetchComments } from '../api/api';

const TopUsersPage = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopUsers = async () => {
      setLoading(true);
      try {
        const [users, posts, comments] = await Promise.all([
          fetchUsers(),
          fetchPosts(),
          fetchComments()
        ]);

        // Map postId -> userId
        const postOwnerMap = {};
        posts.forEach(post => {
          postOwnerMap[post.id] = post.userId;
        });

        // Count comments per user
        const commentCountMap = {};
        comments.forEach(comment => {
          const userId = postOwnerMap[comment.postId];
          if (userId) {
            commentCountMap[userId] = (commentCountMap[userId] || 0) + 1;
          }
        });

        // Combine user data with comment count
        const usersWithCommentCounts = users.map(user => ({
          ...user,
          commentCount: commentCountMap[user.id] || 0
        }));

        // Sort & take top 5
        const top5 = usersWithCommentCounts
          .sort((a, b) => b.commentCount - a.commentCount)
          .slice(0, 5);

        setTopUsers(top5);
      } catch (err) {
        console.error("Error loading top users:", err);
      }
      setLoading(false);
    };

    loadTopUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Top 5 Users by Comments</Typography>
      {loading ? <CircularProgress /> : (
        topUsers.map(user => (
          <UserCard key={user.id} user={user} commentCount={user.commentCount} />
        ))
      )}
    </Container>
  );
};

export default TopUsersPage;

