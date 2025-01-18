import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader,
  Typography,
  Button,
  TextField,
  Chip,
  Box,
  Alert,
  AlertTitle,
  Paper,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  MobileStepper,
} from '@mui/material';
import {
  Timer as TimerIcon,
  Error as AlertIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingUpIcon,
  Grass as WheatIcon,
  ArrowBack as ArrowBackIcon,
  NavigateNext,
  NavigateBefore,
  LocalFlorist as SproutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';

const CropBiddingPage = () => {
  const [currentBid, setCurrentBid] = useState(1000);
  const [userBid, setUserBid] = useState("");
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fixed: Moved auctionDetails to state
  const [auctionDetails] = useState({
    startPrice: 800,
    reservePrice: 1500,
    minimumIncrement: 10,
    startDate: "2025-01-19T00:00:00",
    endDate: "2025-01-22T23:59:59"
  });

  const [biddingHistory] = useState([
    { bidder: "কৃষক জো", amount: 950, time: "২ মিনিট আগে" },
    { bidder: "এগ্রোটেক", amount: 900, time: "৫ মিনিট আগে" },
    { bidder: "হারভেস্ট কোং", amount: 850, time: "১০ মিনিট আগে" },
  ]);

  // Add new states for image carousel
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  // Sample images array
  const images = [
    "src/assets/vegetable-garden.jpg",
    "src/assets/smart-farming.jpg",
    "src/assets/rice-field.jpg",
    "src/assets/farming-trainig.jpeg",
    "src/assets/farmer.jpg",
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Calculate remaining time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(auctionDetails.endDate).getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setRemainingTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auctionDetails.endDate]);

  const handleBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseFloat(userBid) <= currentBid) {
      alert("Bid must be higher than current bid!");
      return;
    }
    setCurrentBid(parseFloat(userBid));
    setUserBid("");
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Enhanced green color palette
  const colors = {
    primary: {
      main: '#1B5E20',
      light: '#2E7D32',
      dark: '#1B4332',
      gradient: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)'
    },
    secondary: {
      main: '#43A047',
      light: '#4CAF50',
      dark: '#388E3C'
    },
    accent: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#558B2F'
    },
    background: {
      default: '#F1F8F1',
      paper: '#FFFFFF',
      card: '#F5FAF5'
    },
    border: {
      main: '#E8F5E9',
      dark: '#C8E6C9'
    },
    text: {
      primary: '#1C2833',
      secondary: '#2E7D32',
      light: '#66BB6A'
    }
  };

  // Card category colors
  const categoryColors = {
    seeds: {
      bg: '#E8F5E9',
      border: '#C8E6C9',
      text: '#2E7D32'
    },
    equipment: {
      bg: '#F1F8E9',
      border: '#DCEDC8',
      text: '#558B2F'
    },
    fertilizer: {
      bg: '#F9FBE7',
      border: '#F0F4C3',
      text: '#827717'
    },
    pesticide: {
      bg: '#E0F2F1',
      border: '#B2DFDB',
      text: '#00695C'
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.default }}>
      {/* Header */}
      <div style={{ 
        background: colors.primary.gradient,
        borderBottom: `1px solid ${colors.border.dark}`
      }}>
        <div className="p-4 md:px-8 lg:px-16 flex justify-between items-center border-b">
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ color: colors.primary }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 'bold' }}>
            বিডিং বিস্তারিত
          </Typography>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      <Container maxWidth="lg" sx={{ 
        py: { xs: 2, md: 4 },
        px: { xs: 2, md: 4 },
      }}>
        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Left Column - Image Gallery */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: colors.background.paper,
                borderRadius: 2,
                border: `1px solid ${colors.border.main}`,
                overflow: 'hidden',
                mb: 3,
                '&:hover': {
                  boxShadow: `0 0 0 2px ${colors.primary.light}`
                }
              }}
            >
              <Box sx={{ 
                position: 'relative',
                // Reduced height for both mobile and desktop
                height: { xs: 200, md: 300 }, // Changed from { xs: 300, md: 400 }
                borderRadius: '8px',
                border: '1px solid #e8e6df',
                overflow: 'hidden'
              }}>
                <img
                  src={images[activeStep]}
                  alt={`Wheat crop ${activeStep + 1}`}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                  }}
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  <NavigateBefore />
                </IconButton>
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                  }}
                  onClick={handleNext}
                  disabled={activeStep === images.length - 1}
                >
                  <NavigateNext />
                </IconButton>
                <Chip 
                  label="Grade A"
                  sx={{ 
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: '#2c5530',
                    color: 'white'
                  }}
                />
              </Box>
              
              {/* Image Stepper */}
              <MobileStepper
                steps={images.length}
                position="static"
                activeStep={activeStep}
                sx={{
                  bgcolor: 'transparent',
                  '& .MuiMobileStepper-dot': {
                    bgcolor: '#e8e6df'
                  },
                  '& .MuiMobileStepper-dotActive': {
                    bgcolor: '#2c5530'
                  }
                }}
                backButton={null}
                nextButton={null}
              />

              {/* Thumbnail Preview */}
              <Box sx={{ 
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': {
                  height: 6
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: '#e8e6df',
                  borderRadius: 3
                }
              }}>
                {images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setActiveStep(index)}
                    sx={{
                      flexShrink: 0,
                      width: 80,
                      height: 60,
                      borderRadius: 1,
                      overflow: 'hidden',
                      border: activeStep === index ? '2px solid #2c5530' : '1px solid #e8e6df',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Price Summary Grid - Moved from separate section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { 
                  label: 'শুরুর মূল্য', 
                  value: auctionDetails.startPrice,
                  color: categoryColors.seeds
                },
                { 
                  label: 'বর্তমান দর', 
                  value: currentBid,
                  color: categoryColors.equipment
                },
                { 
                  label: 'সর্বনিম্ন মূল্য', 
                  value: auctionDetails.reservePrice,
                  color: categoryColors.fertilizer
                },
                { 
                  label: 'ন্যূনতম বৃদ্ধি', 
                  value: auctionDetails.minimumIncrement,
                  color: categoryColors.pesticide
                }
              ].map((item, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2,
                      textAlign: 'center',
                      bgcolor: item.color.bg,
                      border: `1px solid ${item.color.border}`,
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${item.color.border}`
                      }
                    }}
                  >
                    <Typography variant="caption" sx={{ color: item.color.text }}>
                      {item.label}
                    </Typography>
                    <Typography variant="h6" sx={{ color: item.color.text, fontWeight: 'bold' }}>
                      ৳{item.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Specifications Card */}
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: colors.background.card,
                borderRadius: 2,
                border: `1px solid ${colors.border.main}`,
                p: 3
              }}
            >
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#2c5530', mb: 2 }}>
                {/* <LeafIcon sx={{ fontSize: 20 }} /> */}
                পণ্যের বিবরণ
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'white', borderRadius: 1, border: 1, borderColor: '#e8e6df' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>ধরন:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>হার্ড রেড উইন্টার</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'white', borderRadius: 1, border: 1, borderColor: '#e8e6df' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>গ্রেড:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>গ্রেড ১</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'white', borderRadius: 1, border: 1, borderColor: '#e8e6df' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>আর্দ্রতা:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>১২.৫%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'white', borderRadius: 1, border: 1, borderColor: '#e8e6df' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>প্রোটিন:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>১৪%</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={5}>
            {/* Timer Card */}
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: colors.background.card,
                borderRadius: 2,
                border: `1px solid ${colors.border.main}`,
                p: 3,
                mb: 3,
                background: `linear-gradient(145deg, ${colors.background.paper} 0%, ${colors.background.card} 100%)`
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  color: colors.primary,
                  textAlign: 'center',
                  fontWeight: 600
                }}
              >
                <TimerIcon sx={{ mr: 1, color: colors.primary }} />
                অবশিষ্ট সময়
              </Typography>
              <Grid container spacing={1}>
                {[
                  { value: remainingTime.days, label: 'দিন' },
                  { value: remainingTime.hours, label: 'ঘণ্টা' },
                  { value: remainingTime.minutes, label: 'মিনিট' },
                  { value: remainingTime.seconds, label: 'সেকেন্ড' }
                ].map((time, index) => (
                  <Grid item xs={3} key={index}>
                    <Box sx={{ 
                      p: { xs: 1, md: 2 }, 
                      bgcolor: 'white', 
                      borderRadius: 1, 
                      border: 1, 
                      borderColor: '#e8e6df' 
                    }}>
                      <Typography variant={isMobile ? "h6" : "h5"} sx={{ color: '#2c5530' }}>
                        {time.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {time.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Bidding Form */}
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: colors.background.paper,
                borderRadius: 2,
                border: `1px solid ${colors.border.main}`,
                p: 3
              }}
            >
              <form onSubmit={handleBidSubmit}>
                <TextField
                  fullWidth
                  label="আপনার দর (টাকা)"
                  variant="outlined"
                  value={userBid}
                  onChange={(e) => setUserBid(e.target.value)}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: colors.secondary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.primary.main,
                      }
                    }
                  }}
                  inputProps={{ min: currentBid + auctionDetails.minimumIncrement, step: auctionDetails.minimumIncrement }}
                  required
                />
                <Button 
                  type="submit" 
                  fullWidth
                  sx={{
                    bgcolor: colors.primary.main,
                    color: 'white',
                    py: 1.5,
                    '&:hover': {
                      bgcolor: colors.primary.dark,
                    }
                  }}
                >
                  দর জমা দিন
                </Button>
              </form>
            </Paper>

            {/* Bidding History */}
            <Paper 
              elevation={0}
              sx={{ 
                mt: 3,
                bgcolor: 'white',
                borderRadius: 2,
                border: `1px solid ${colors.border}`,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ p: 3, borderBottom: `1px solid ${colors.border}` }}>
                <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: colors.primary }} />
                  দরের ইতিহাস
                </Typography>
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {biddingHistory.map((bid, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 1, borderColor: '#e8e6df', pb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={bid.bidder}
                          variant="outlined"
                          sx={{ borderColor: '#5a7c3e', color: '#5a7c3e' }}
                        />
                        <Typography variant="body2" sx={{ color: '#666' }}>{bid.time}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 'medium', color: '#2c5530' }}>
                        ${bid.amount.toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>

        {/* Terms & Conditions */}
        <Paper 
          elevation={0}
          sx={{ 
            mt: 4,
            bgcolor: 'white',
            borderRadius: 2,
            border: `1px solid ${colors.border}`,
            p: 3
          }}
        >
          <CardHeader 
            title={
              <Typography variant="h6" sx={{ color: '#2c5530' }}>
                নিয়ম ও শর্তাবলী
              </Typography>
            }
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon sx={{ color: '#5a7c3e' }} />
                <Typography variant="body2" sx={{ color: '#2c5530' }}>বিক্রেতা আমাদের মান নিশ্চিতকরণ টিম দ্বারা যাচাইকৃত</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: '#666' }}>
                <Typography variant="body2">• বিজয়ী দর প্রদানের ২৪ ঘণ্টার মধ্যে পেমেন্ট সম্পন্ন করতে হবে</Typography>
                <Typography variant="body2">• শিপিং শর্ত: FOB Origin</Typography>
                <Typography variant="body2">• মান পরীক্ষার সার্টিফিকেট উপলব্ধ</Typography>
                <Typography variant="body2">• বাতিলকরণ জরিমানা: দরের ৫%</Typography>
              </Box>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </div>
  );
};

export default CropBiddingPage;