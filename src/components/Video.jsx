import classes from "../styles/Video.module.css";
const Video = ({ title, id, noq, image }) => {
	return (
		<div className={classes.video}>
			<img src={image} alt={title} />
			<p>{title}</p>
			<div className={classes.qmeta}>
				<p>{noq} Questions</p>
				<p>Total points : {noq * 5}</p>
			</div>
		</div>
	);
};

export default Video;
