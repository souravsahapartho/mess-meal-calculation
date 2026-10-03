import { toPng, toJpeg } from 'html-to-image';

export const generateMealImage = async (node, reportData, format = 'png') => {
  if (!node) {
    throw new Error('Report template node not found');
  }

  const {
    messName = 'MealMate-Mess',
    month = 'October',
    year = 2026
  } = reportData;

  const safeMess = (messName || 'MealMate-Mess').replace(/[^a-zA-Z0-9]/g, '-');
  const filename = `${safeMess}-Meal-Report-${month}-${year}.${format === 'jpeg' ? 'jpg' : 'png'}`;

  const options = {
    quality: 0.98,
    pixelRatio: 2.5,
    backgroundColor: '#ffffff',
    cacheBust: true,
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left',
      margin: '0',
    }
  };

  try {
    let dataUrl;
    if (format === 'jpeg') {
      dataUrl = await toJpeg(node, options);
    } else {
      dataUrl = await toPng(node, options);
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return filename;
  } catch (error) {
    console.error('Failed to generate report image:', error);
    throw error;
  }
};
