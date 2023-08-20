# Proof-of-workout-protocol-supahack

In a world where couches have become our new best friends and our fingers are more accustomed to swiping screens than lifting dumbbells, staying active has turned into a battle of willpower against the siren call of Netflix and cozy blankets. We've all had those ambitious moments where we declare, "I'm going to hit the gym every day and get buff!" But let's be real, it's super hard to commit ourselves to any fitness related challenges. As a result, maintaining regular physical activity is a challenge.

At the same time, the growth of Ethereum has paved the way for decentralised applications that can incentivise certain behaviours.

Proof of Workout Protocol (POWP) dApp is a unique solution that motivates users to be physically active through gamification and financial incentives, making workouts fun and rewarding.

On POWP, users can browser through a variety of different fitness 'quests'. Each fitness quest is its very own fitness challenge. These quests can be created by anyone.

Users can start a 'challenge' to a particular quest. To start, they must stake a certain minimum of ETH to POWP's contract address to begin the quest. This certain minimum is predetermined by the quest creator. The purpose of staking ETH serves as a tangible, monetary commitment, motivating individuals to follow through with desired tasks by introducing a potential financial consequence for non-completion - if the user manages to succeed the challenge, they get their ETH back ; if the user fails, however, their ETH will be taken away and redistributed - 50% of their stake will be sent to the quest creator, the other 50% evenly distributed among other users who have also succeeded in a challenge for that particular quest.

After staking the ETH, an active challenge to a quest is on! Users will have a certain amount of time, aka a ‘max quest duration,’ to do a workout. This ‘max quest duration ‘ is again, predetermined by the quest creator. For example, if a challenge to Quest A has been started on 1:00 PM, and the max quest duration is ’3600 seconds’, aka 60 minutes, the user has until 2:00 PM to submit a challenge. Otherwise, the challenge is marked as failed, and consequences happen - they lose their stake.

Now, it’s time to do a workout. To do a workout, you must record your workout on the fitness app ‘Strava’, a social fitness platform that enables athletes to track and share their workouts, connect with other individuals, and analyse performance data through its app and website. This recorded workout on Strava must have a moving time duration greater than or equal to a minimum workout duration, again predetermined by the quest creator - in other words, you must do a workout long enough, within a given time!!! Go go go!

After recording a workout that meets the requirements on Strava, users can then go to their active quest challenge and submit this challenge for the quest. The user would connect their Strava account with the dApp, then select the workout they just did. Now, they can submit their challenge to the quest, and their challenge would be marked as completed!

When a quest is completed, the user is rewarded. They are rewarded with 4 things : 1. their staked ETH will be sent back to them, 2. They get to mint a sexy NFT ‘badge’ that commemorates that they completed a quest, 3. they get an attestation on-chain, on Ethereum Attestation Service, and 4. They will win some POW tokens! With these incentives that users can potentially get for completing challenges to quests, they would be more incentivised to do workouts and get healthy!

Hold up, but what are POW tokens? The POW token, an ERC20 token, serves as a pivotal element within the dApp's framework, functioning as both an incentive and a scoring metric for the leaderboard. The Proof of Workout (POW) tokens are used as in-game incentives, for granting access to more challenging workout quests with commensurate higher rewards, and more. This incentive structure is bolstered by the following formula, ensuring that tougher quests yield greater amounts of POW tokens, thereby compelling users to enthusiastically partake in and accomplish these undertakings:

eth_staked (wei) * duration (sec) * difficulty (integral) / 10^18

where difficulty score is a multiplier factor based on the difficulty level of the quest (e.g., 1 for easy, 2 for medium, 3 for hard).

This formula ensures that the users who take up more challenging and longer quests, and stake higher amounts of ETH, are rewarded more POW tokens. 
