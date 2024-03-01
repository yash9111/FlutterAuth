import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:auth_buttons/auth_buttons.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Google Sign In Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SignInScreen(),
    );
  }
}

class SignInScreen extends StatelessWidget {
  final GoogleSignIn googleSignIn = GoogleSignIn(
    clientId:
        '244454609589-26av0imppjmp2srr4h0nabsiso3rc7ml.apps.googleusercontent.com',
    scopes: ['email'],
  );
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sign In'),
      ),
      body: Center(
        child: GoogleAuthButton(
          onPressed: () => _handleSignIn(context),
          darkMode: true, // Adjust based on your UI preferences
        ),
      ),
    );
  }

  Future<void> _handleSignIn(BuildContext context) async {
    try {
      await googleSignIn.signIn();
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => HomeScreen(googleSignIn: googleSignIn)),
      );
    } catch (error) {
      print('Error signing in: $error');
    }
  }
}

class HomeScreen extends StatelessWidget {
  final GoogleSignIn googleSignIn;

  HomeScreen({required this.googleSignIn});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Welcome!',
              style: TextStyle(fontSize: 24.0),
            ),
            SizedBox(height: 20.0),
            FutureBuilder(
              future: googleSignIn.signInSilently(),
              builder: (context, AsyncSnapshot<GoogleSignInAccount?> snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return CircularProgressIndicator();
                } else if (snapshot.hasData) {
                  final user = snapshot.data!;
                  return Column(
                    children: [
                      Text(
                        'Name: ${user.displayName}',
                        style: TextStyle(fontSize: 18.0),
                      ),
                      Text(
                        'Email: ${user.email}',
                        style: TextStyle(fontSize: 18.0),
                      ),
                    ],
                  );
                } else {
                  return Text('User not authenticated');
                }
              },
            ),
          ],
         
        ),
         
      ),
    );
  }
}
