// Secure credentials (replace with environment variables in production)
const UNSPLASH_API_KEY = 'c4EdfVpeMdm2PmhkY3icvzNzbK9gy7OBzraExnBA6GI';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';
const SPOTIFY_CLIENT_ID = '93199674f4034147af28b4a461387005';
const SPOTIFY_CLIENT_SECRET = '0733d7bd6bf74c3287971610558ed691';

// DOM Elements
const promptSelector = document.getElementById('promptSelector');
const backButton = document.getElementById('backButton');
const sections = {
    writing: document.getElementById('writingSection'),
    art: document.getElementById('artSection'),
    coding: document.getElementById('codingSection'),
    music: document.getElementById('musicSection'),
};

// Spotify Authentication
async function getSpotifyAccessToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)}`,
            },
            body: 'grant_type=client_credentials',
        });

        if (!response.ok) throw new Error('Failed to fetch Spotify token');
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Spotify Auth Error:', error);
        return null;
    }
}

// Spotify Track Search
async function searchSpotifyTracks(genre, mood, tempo) {
    const token = await getSpotifyAccessToken();
    if (!token) {
        return [];
    }

    const query = [genre, mood, tempo].filter(Boolean).join(' ');
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch tracks');
        const data = await response.json();
        return data.tracks.items || [];
    } catch (error) {
        console.error('Spotify Search Error:', error);
        return [];
    }
}

// Unsplash Image Search
async function searchUnsplashImages(query, style, mood) {
    const searchQuery = [query, style, mood].filter(Boolean).join(' ');
    try {
        const response = await fetch(`${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=1`, {
            headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` },
        });

        if (!response.ok) throw new Error('Failed to fetch Unsplash images');
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Unsplash Search Error:', error);
        return [];
    }
}

// Event Listeners for Prompt Type Selection
document.querySelectorAll('.prompt-card').forEach((card) => {
    card.addEventListener('click', () => {
        const type = card.dataset.type;
        showSection(type);
        // Clear previous outputs when switching sections
        document.querySelectorAll('.output').forEach((output) => (output.textContent = ''));
        document.querySelectorAll('.word-count').forEach((count) => (count.textContent = ''));
        document.getElementById('spotifyPreview').innerHTML = '';
    });
});

// Back Button Event Listener
backButton.addEventListener('click', showPromptSelector);

// Show/Hide Section Functions
function showSection(type) {
    promptSelector.style.display = 'none';
    backButton.style.display = 'block';
    Object.values(sections).forEach((section) => (section.style.display = 'none'));
    sections[type].style.display = 'block';
}

function showPromptSelector() {
    Object.values(sections).forEach((section) => (section.style.display = 'none'));
    promptSelector.style.display = 'block';
    backButton.style.display = 'none';
}

// Word count helper function
function countWords(str) {
    return str.trim().split(/\s+/).length;
}

// Update word count in the UI
function updateWordCount(text, elementId) {
    const wordCount = countWords(text);
    const countElement = document.getElementById(elementId);
    countElement.textContent = `Word count: ${wordCount}`;
}

// Copy text functionality
function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard
        .writeText(text)
        .then(() => alert('Prompt copied to clipboard!'))
        .catch((err) => {
            console.error('Failed to copy text:', err);
            alert('Failed to copy text. Please try again.');
        });
}

// Writing Form Handler
document.getElementById('writingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const character = document.getElementById('character').value.trim();
    const setting = document.getElementById('setting').value.trim();
    const conflict = document.getElementById('conflict').value.trim();
    const mode = document.getElementById('mode').value.trim();
    const details = document.getElementById('details').value.trim();  // Add details field

    if (!character && !setting && !conflict && !mode && !details) {
        alert('Please provide at least one input to generate a prompt!');
        return;
    }

    let promptIntro;
    switch (mode.toLowerCase()) {
        case 'dramatic':
            promptIntro = 'Picture a gripping tale full of suspense and intensity:';
            break;
        case 'sad':
            promptIntro = 'Imagine a heartbreaking story filled with sorrow and loss:';
            break;
        case 'romance':
            promptIntro = 'Visualize a tender love story blooming against all odds:';
            break;
        case 'adventure':
            promptIntro = 'Embark on an epic journey packed with thrills and excitement:';
            break;
        case 'mystery':
            promptIntro = 'Dive into an enigmatic tale of secrets and revelations:';
            break;
        default:
            promptIntro = 'Imagine an intriguing concept:';
    }

    let promptParts = [];
    if (character) promptParts.push(`a character named "${character}"`);
    if (setting) promptParts.push(`in a setting like "${setting}"`);
    if (conflict) promptParts.push(`facing the challenge of "${conflict}"`);
    
    // Add details to the prompt if provided
    let prompt = `${promptIntro} ${promptParts.join(', ')}`;
    if (details) {
        prompt += `. Additional context: ${details}`;
    }
    prompt += `. Develop a story based on this idea.`;

    document.getElementById('writingOutput').textContent = prompt;
    updateWordCount(prompt, 'writingWordCount');
});

// Art Form Handler
document.getElementById('artForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const subject = document.getElementById('subject').value;
    const style = document.getElementById('style').value;
    const mood = document.getElementById('mood').value;

    try {
        const images = await searchUnsplashImages(subject, style, mood);
        const imagePreview = document.getElementById('imagePreview');
        const photoCredit = document.getElementById('photoCredit');
       
        if (images.length > 0) {
            const image = images[0];
            imagePreview.src = image.urls.regular;
            imagePreview.style.display = 'block';
            photoCredit.textContent = `Photo by ${image.user.name} on Unsplash`;
            photoCredit.style.display = 'block';
        }

        const prompt = `Create artwork featuring ${subject} in ${style} style with a ${mood} atmosphere.`;
        document.getElementById('artOutput').textContent = prompt;
        updateWordCount(prompt, 'artWordCount');
    } catch (error) {
        console.error('Art prompt generation error:', error);
    }
});

// Coding Form Handler
document.getElementById('codingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const language = document.getElementById('language').value;
    const difficulty = document.getElementById('difficulty').value;
    const projectType = document.getElementById('projectType').value;
    const requirements = document.getElementById('requirements').value;

    const prompt = `Create a ${difficulty} level ${projectType} project using ${language}. Project requirements: ${requirements}`;
    document.getElementById('codingOutput').textContent = prompt;
    updateWordCount(prompt, 'codingWordCount');
});

// Music Form Handler
document.getElementById('musicForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const genre = document.getElementById('genre').value;
    const mood = document.getElementById('mood').value;
    const tempo = document.getElementById('tempo').value;
    const theme = document.getElementById('theme').value.trim();

    try {
        const tracks = await searchSpotifyTracks(genre, mood, tempo);
        const prompt = `Create a ${genre} song about "${theme}" with a ${mood} feel and ${tempo} tempo.`;
        document.getElementById('musicOutput').textContent = prompt;
        updateWordCount(prompt, 'musicWordCount');

        const previewContainer = document.getElementById('spotifyPreview');
        if (tracks.length > 0) {
            previewContainer.innerHTML = tracks.map(track => `
                <div>
                    <h4>${track.name} by ${track.artists.map(a => a.name).join(', ')}</h4>
                    ${track.preview_url
                        ? `<audio controls src="${track.preview_url}"></audio>`
                        : `<p>Listen on <a href="${track.external_urls.spotify}" target="_blank">Spotify</a>.</p>`}
                </div>
            `).join('');
        } else {
            previewContainer.innerHTML = '<p>No tracks found. Try different input.</p>';
        }
    } catch (error) {
        console.error('Music prompt generation error:', error);
        document.getElementById('musicOutput').textContent = `Create a ${genre} song about "${theme}" with a ${mood} feel and ${tempo} tempo.`;
        document.getElementById('spotifyPreview').innerHTML = '<p>Unable to fetch songs. Please try again later.</p>';
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', showPromptSelector);

