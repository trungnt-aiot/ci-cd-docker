import app from './app';

const PORT: number = Number(process.env.PORT) || 3030;

app.listen(PORT, () => {
    console.log(`Server running on http://${process.env.HOST_IP}:${PORT}`);
    console.log(`Frontend running on http://${process.env.HOST_IP}:${process.env.FRONTEND_PORT}`);
});
