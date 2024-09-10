import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";
import { User } from "../models/User.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;
   
  if (!name || !email || !message)
    return next(new ErrorHandler("All fields are mandatory", 400));

  const to = process.env.MY_MAIL;
  const subject = "Contact from CourseBundler";
  const text = `I am ${name} and my Email is ${email}. \n${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Message Has Been Sent.",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course)
    return next(new ErrorHandler("All fields are mandatory", 400));

  const to = process.env.MY_MAIL;
  const subject = "Requesting for a course on CourseBundler";
  const text = `I am ${name} and my Email is ${email}. \n${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Request Has Been Sent.",
  });
});
export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 400));

  user.subscription.id = user._id; // In a real scenario, this might be a subscription ID from a payment provider
  user.subscription.status = "active";
  await user.save();

  res.status(200).json({
    success: true,
    message: "Subscription purchased successfully",
    redirectUrl: `${process.env.FRONTEND_URL}/paymentsuccess`,
  });
});


export const cancelSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message:
      "Subscription cancelled, Now refund initiated as subscription was cancelled after 7 days.",
  });
});
export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }
  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;

  let usersPercentage = 0,
    viewsPercentage = 0,
    subscriptionPercentage = 0;
  let usersProfit = true,
    viewsProfit = true,
    subscriptionProfit = true;
  const difference = {
    users: statsData[11].users - statsData[10].users,
    views: statsData[11].views - statsData[10].views,
    subscription: statsData[11].subscription - statsData[10].subscription,
  };
  if (statsData[10].users === 0) usersPercentage = usersCount * 100;
  else usersPercentage = (difference.users / statsData[10].users) * 100;

  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  else viewsPercentage = (difference.views / statsData[10].views) * 100;

  if (statsData[10].subscription === 0)
    subscriptionPercentage = subscriptionCount * 100;
  else subscriptionPercentage =
    (difference.subscription / statsData[10].subscription) * 100;




  if (usersPercentage < 0) usersProfit = false;
  if (viewsPercentage < 0) viewsProfit = false;
  if (subscriptionPercentage < 0) subscriptionProfit = false;


  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  });
});
