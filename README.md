# Proof-of-workout-protocol

## Table of Contents
1. [Intro](#intro)
2. [Product market fit](#product-market-fit)
3. [Scalability](#scalability)
4. [Investability](#investability)
5. [Design](#design)
6. [Execution](#execution)

## 📜 Intro 
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

## 🎯 Product market fit
The POW dApp addresses the growing market need for engaging and effective fitness solutions. Given the popularity of fitness gamification and the novelty of integrating fitness with blockchain technology, the dApp has significant potential for mass adoption.
 
## 📈 Scalability
POW dApp contributes to the Ethereum ecosystem by encouraging healthier behaviors and creating a competitive environment for fitness. The POW token's utility can be expanded over time, paving the way for future growth and scalability.

There are many more ways for the POW token to provide utility in the future.  In the future, the POWP ecosystem will introduce a feature known as 'PowMogis.' Much like Snapchat's Bitmojis or Roblox avatars, PowMogis will allow users to customize an avatar that represents them in the platform. Users can spend POW tokens to acquire assets for their avatar, such as cosmetic enhancements or clothing. The addition of these gamified elements not only makes the platform more engaging but also increases the utility and demand for POW tokens. 

Additionally, in the long term, the POWP ecosystem envisions the establishment of a Decentralized Autonomous Organization (DAO) focused on fitness. Holding a certain minimum amount of POW tokens will be a requirement for DAO membership and voting rights. This setup creates an elite fitness club dynamic, where members are likely to be both physically fit (as they have completed numerous workout quests) and financially prosperous (having staked significant amounts of ETH). The POW tokens thus represent a badge of honor and a ticket to a prestigious community, further enhancing their value.

## 🤑 Investability
The POW dApp creates value by promoting fitness and offering financial incentives for active behavior. The staking mechanism invites an influx of ETH, and the potential for future partnerships and integrations opens the door for additional capital investment.

For example, companies can create fitness quests tailored around their brand or products. For example, a sportswear brand like Nike could create a quest around running, encouraging users to beat their personal best in Nike footwear. Similarly, a nutrition brand could create quests centered around maintaining a healthy diet or achieving specific fitness goals.

Companies can also offer special rewards to users. This could range from discount coupons and free products to exclusive experiences. For instance, a company could offer the first ten users to complete a quest an opportunity to train with a celebrity athlete or a special edition of their product.

Such partnerships can generate valuable brand exposure and customer loyalty. They also provide a unique way to tie a brand's marketing efforts directly to its audience's fitness goals, making for a highly engaging and rewarding user experience.

## 🎨 Design
The fusion of digital and physical realities through the POW dApp represents a novel approach to incentivizing fitness. It stands as a stepping stone for future projects at the intersection of blockchain and health/wellness.

## 🛠️ Execution
The dApp effectively integrates various products and tools into a cohesive and exciting platform. Ethereum is used for account management and staking, the custom POW token for rewards, and potential future integrations with fitness tracking devices or apps, all supporting the idea without detracting from the user experience.

