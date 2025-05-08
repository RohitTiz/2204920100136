import { Card, CardContent, Typography, Avatar } from '@mui/material';

const UserCard = ({ user, commentCount }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ width: 56, height: 56, marginRight: 2 }} src={`https://i.pravatar.cc/150?u=${user.id}`} />
        <div>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
          <Typography variant="body2">Total Comments: {commentCount}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
