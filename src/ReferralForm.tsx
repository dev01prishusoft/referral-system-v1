import React, { useState } from "react"
import { useEffect } from "react"

const ReferralForm = () => {
	const [userId, setUserId] = useState("")

	const handleSubmit = async (event) => {
		event.preventDefault()

		const data = {
			userId
		}

		const response = await fetch("http://localhost:5000/create", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (response.status === 200) {
			const referralCode = await response.json()
			console.log("Referral code:", referralCode)
		} else {
			console.log("Error creating referral:", response.status)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="User ID"
				value={userId}
				onChange={(event) => setUserId(event.target.value)}
			/>
			<button type="submit">Create Referral</button>
		</form>
	)
}

export default ReferralForm
